import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$http = axios
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.withCredentials = true

const urlprefix='http://192.168.1.43:8000/api/student/online/'

export default {
  getpiedata() {
    return online_get('kindcollect')
  },
  getstuonlinetime(stuid = undefined) {
    let params = {}
    params['stuid'] = stuid
    return online_get('stuonlinetime', { params: params })
  },
  getsturoute(stuid = undefined, data = undefined) {
    let params = {
      stuid,
      data
    }
    return online_get('sturoute', { params, params })
  },
  getstuonlinesort(stuid = undefined, term = undefined) {
    let params = {
      stuid,
      term
    }
    return online_get('stuonlinesort', { params: params })
  },
  getbuildingcoord() {
    return online_get('buildingcoord')
  },
  getheatmap(date = undefined) {
    let params = { date }
    return online_get('heatmap', { params: params })
  },
  getcollegefreq() {
    return online_get('collegefreq')
  },
  filterstudents(college=undefined,grade=undefined,keyword=undefined) {
    let params={
      college,
      grade,
      keyword
    }
    return online_get('filterstudents',{params:params})
  },
  makerandomid(){
    return online_get('makerandomid')
  },
  getstudentstatus(stuid=undefined){
    let params={
      stuid
    }
    return online_get('getstudentstatus',{params: params})
  }
}

function online_get(url, options) {
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