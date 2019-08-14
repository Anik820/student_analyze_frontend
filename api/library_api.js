import axios from 'axios'
import Vue from 'vue'

axios.defaults.baseURL = 'http://192.168.1.43:8002/api'
Vue.prototype.$http = axios
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.withCredentials = true

export default{
    // getprofessional_elective(xy,nj,kc){
    //     console.log(xy+'/'+nj+'/'+kc)
    //     return get('v1/study/professional_elective_data/'+xy+'/'+nj+'/'+kc)
    // },
    // getprofessional_compulsory(){
    //     return get('v1/library/top_borrow')
    // }

    getcuc_borrow_result(){
      return get('v1/library/result_borrow')
  },
  getcuc_borrow_result(year){
    return get('v1/library/result_borrow')
},
getcuc_hotbook_school(){
  return get('v1/library/hotbook_school')
},
getbooktype(){
  return get('v1/library/booktype_borrow')
},
getpartment(){
  return get('v1/library/partment_result')

},
gethotbook_college(xy,nj){
  return get('v1/library/hotbook_college/'+xy+'/'+nj)
},
getperson_top_borrow(year){
  return get('v1/library/top_borrow/'+year)
},
getperson_compareschool(xh){
  const path = 'http://localhost:5000/api/v1/library/person_compareschool';
  
  return axios({
    url: path,
    method: 'post',
    data: {'student_id':xh}
  })
  //get('v1/library/person_compareschool')
},
getavgbook_college(xy){
  return get('v1/library/avg_compare/'+xy)
},
getcollege_borrow_drill(year, col){
  return get('v1/library/college_drill_one/'+year+'/'+col)
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
      axios.get(url, {params})
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