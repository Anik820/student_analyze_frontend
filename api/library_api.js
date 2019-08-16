import axios from 'axios'
import Vue from 'vue'


//axios.defaults.baseURL = 'http://192.168.1.43:8002/api'
Vue.prototype.$http = axios
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.withCredentials = true

const urlprefix="http://192.168.1.43:8003/api/"
export default{
    // getprofessional_elective(xy,nj,kc){
    //     console.log(xy+'/'+nj+'/'+kc)
    //     return get('student/study/professional_elective_data/'+xy+'/'+nj+'/'+kc)
    // },
    // getprofessional_compulsory(){
    //     return get('student/library/top_borrow')
    // }

    getcuc_borrow_result(){
      return get('student/library/result_borrow')
  },
  getcuc_borrow_result(year){
    return get('student/library/result_borrow')
},
getcuc_hotbook_school(){
  return get('student/library/hotbook_school')
},
getbooktype(){
  return get('student/library/booktype_borrow')
},
getpartment(){
  return get('student/library/partment_result')

},
gethotbook_college(xy,nj){
  return get('student/library/hotbook_college/'+xy+'/'+nj)
},
getperson_top_borrow(year){
  return get('student/library/top_borrow/'+year)
},
getperson_compareschool(xh){
  const path = 'http://192.168.1.43:8003/api/student/library/person_compareschool';
  
  return axios({
    url: path,
    method: 'post',
    data: {'student_id':xh}
  })
  //get('student/library/person_compareschool')
},
getavgbook_college(xy){
  return get('student/library/avg_compare/'+xy)
},
getcollege_borrow_drill(year, col){
  return get('student/library/college_drill_one/'+year+'/'+col)
},

 


}

function get(url, options) {
    if (options !== undefined) {
      var {params = {}} = options
    } else {
      params = {}
    }
    return new Promise((resolve, reject) => {

    //   console.log({params})
      axios.get(urlprefix+url, {params})
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