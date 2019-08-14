import axios from 'axios'
import Vue from 'vue'

axios.defaults.baseURL = 'http://192.168.1.43:8002/api'
Vue.prototype.$http = axios
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.withCredentials = true

export default {
  // getprofessional_elective(xy,nj,kc){
  //     console.log(xy+'/'+nj+'/'+kc)
  //     return get('v1/study/professional_elective_data/'+xy+'/'+nj+'/'+kc)
  // },
  // getprofessional_compulsory(){
  //     return get('v1/library/top_borrow')
  // }

  getprofessional_elective(xy, nj, kc) {
    return get('v1/study/professional_elective_data/' + xy + '/' + kc + '/' + nj)
  },
  getprofessional_compulsory() {
    return get('v1/library/top_borrow')
  },
  getpublic_elective_drill(id) {
    return get('v1/study/public_elective_data/' + id)
  },
  getpublic_elective_drill(id, name) {
    return get('v1/study/public_elective_data/' + id + '/' + name)
  },
  gettongshi_elective(nj, course) {
    return get('v1/study/commoncourse_analyse_data/' + nj + '/' + course)
  },
  gettongshicol_elective(nj, course, college) {
    return get('v1/study/commoncourse_analyse_datazhuanye/' + nj + '/' + course + '/' + college)
  },
  getpublic_elective_drill(id, name) {
    return get('v1/study/public_elective_data/' + id + '/' + name)
  },
  getxueyuan() {
    return get('v1/study/getxueyuan')
  },
  getkecheng(kecheng, nj) {
    return get('v1/study/getkecheng/' + kecheng + '/' + nj)
  },
  getScore(course, xueyuan, nj) {
    return get('v1/study/getScore/' + course + '/' + xueyuan + '/' + nj)
  },
  getdouble_degree(type, zy) {
    return get('v1/study/double_degree_data/' + type + '/' + zy)
  },
  gettongshiScore_per(xuehao) {
    return get('v1/study/tongshiScore/' + xuehao)
  },
  getzhuanyebiScore_per(xuehao, nj) {
    return get('v1/study/zhuanyebiScore/' + xuehao + '/' + nj)
  },
  getxuanxiu_Score(xuehao) {
    return get('v1/study/xuanxiuScore/' + xuehao)
  },
  gettrans_profession(){
    return get('v1/study/trans_profession')
    },
  getperson_publicelective(stuid){
    return get('v1/study/public_elective_Per/'+stuid)
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
    axios.get(url, {
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
