import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    studentid: '',
}
const getters = {
    'studentid' (state) {
        return state.studentid
    }
}

const mutations = {
    ADDSTUDENT(state,{ studentid }){
        state.studentid=studentid
    }
}

const actions = {
    addstudent({commit},studentid){
        commit('ADDSTUDENT',{studentid})
    }
}

export default new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions

})