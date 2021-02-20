import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async fetchRequest({commit, dispatch}, {url, method = 'GET', dataReq}) {
        try {
          const headers = {}
          let body;
          if (dataReq) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(dataReq)
          }
          const response = await fetch(url, { method, headers, body })

          const data = response.json()
          if (!response.ok) throw new Error(`Ошибка с Сервера >>> ${data.message}`)
          return data

        } catch (e) {
          commit('setError', e)
          throw e
        }
    },
    async fetchCurrency() {
      const res = await fetch(`http://localhost:3000/api/currency`)
      return await res.json()
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info, category, record
  }
})
