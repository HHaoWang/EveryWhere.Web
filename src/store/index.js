import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      QRCodeText: 0
    }
  },
  mutations: {
    freshQRCodeText(state,payload){
      state.QRCodeText = payload.text
    }
  },
  actions: {
  },
  modules: {
  }
})
