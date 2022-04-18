import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage:window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    isManager : false,
    hasShop : false,
    shopInfo:{}
  },
  mutations: {
    resetState(state){
      state.token = "";
      state.isManager = false;
      state.hasShop = false;
      state.shopInfo = {};
    },
    setToken(state,token){
      state.token = token;
    },
    setIsManager(state,value){
      state.isManager = value;
    },
    setHasShop(state,value){
      state.hasShop = value;
    },
    setShopInfo(state,value){
      state.shopInfo = value;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
