import axios from 'axios'
import Vue from 'vue'

//axios.defaults.baseURL = 'http://192.168.1.43:8002/api'
Vue.prototype.$http = axios
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.withCredentials = true

const urlprefix='http://192.168.1.43:8002/api/'
export default {
  // getprofessional_elective(xy,nj,kc){
  //     console.log(xy+'/'+nj+'/'+kc)
  //     return get('student/study/professional_elective_data/'+xy+'/'+nj+'/'+kc)
  // },
  // getprofessional_compulsory(){
  //     return get('student/library/top_borrow')
  // }

  getprofessional_elective(xy, nj, kc) {
    return get('student/study/professional_elective_data/' + xy + '/' + kc + '/' + nj)
  },
  getprofessional_compulsory() {
    return get('student/library/top_borrow')
  },
  getpublic_elective_drill(id) {
    return get('student/study/public_elective_data/' + id)
  },
  getpublic_elective_drill(id, name) {
    return get('student/study/public_elective_data/' + id + '/' + name)
  },
  gettongshi_elective(nj, course) {
    return get('student/study/commoncourse_analyse_data/' + nj + '/' + course)
  },
  gettongshicol_elective(nj, course, college) {
    return get('student/study/commoncourse_analyse_datazhuanye/' + nj + '/' + course + '/' + college)
  },
  getpublic_elective_drill(id, name) {
    return get('student/study/public_elective_data/' + id + '/' + name)
  },
  getxueyuan() {
    return get('student/study/getxueyuan')
  },
  getkecheng(kecheng, nj) {
    return get('student/study/getkecheng/' + kecheng + '/' + nj)
  },
  getScore(course, xueyuan, nj) {
    return get('student/study/getScore/' + course + '/' + xueyuan + '/' + nj)
  },
  getdouble_degree(type, zy) {
    return get('student/study/double_degree_data/' + type + '/' + zy)
  },
  gettongshiScore_per(xuehao) {
    return get('student/study/tongshiScore/' + xuehao)
  },
  getzhuanyebiScore_per(xuehao, nj) {
    return get('student/study/zhuanyebiScore/' + xuehao + '/' + nj)
  },
  getxuanxiu_Score(xuehao) {
    return get('student/study/xuanxiuScore/' + xuehao)
  },
  gettrans_profession(){
    return get('student/study/trans_profession')
    },
  getperson_publicelective(stuid){
    return get('student/study/public_elective_Per/'+stuid)
  },
 
}

function get(url, options) {
  if (options !== undefined) {
    var {
      params = {}
    } = options
  } else {
    params = {}
  }
  return new Promise((resolve, reject) => {

    //   console.log({params})
    axios.get(urlprefix+url, {
        params
      })
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
