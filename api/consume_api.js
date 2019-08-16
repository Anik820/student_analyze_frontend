import axios from 'axios'
import Vue from 'vue'

//axios.defaults.baseURL = 'http://192.168.1.43:8001'
Vue.prototype.$http = axios
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.withCredentials = true

const urlprefix='http://192.168.1.43:8001/student/consume/'
export default {
    getprofessional_elective(id) {
        console.log(id)
        return get('student_consumption/mealTimes/' + id)
    },
    getprofessional_compulsory() {
        return get('student_consumption/mealTimes')
    }

}

function get(url, options) {
    if (options !== undefined) {
        var { params = {} } = options
    } else {
        params = {}
    }
    return new Promise((resolve, reject) => {

        //   console.log({params})
        axios.get(urlprefix+url, { params })
            .then(res => {
                // if (res.data.error !== null) {
                // //   Vue.prototype.$message({
                // //     type:'error',
                // //     message:res.data.data
                // //   })
                //   reject(res)
                // }
                resolve(res.data);
            }, err => {
                reject(err);
            })
    })
}