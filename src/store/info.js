import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = { locale: state.info.locale }
    }
  },
  actions: {
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const updateData = { ...getters.info, ...toUpdate }
        await dispatch('fetchRequest', {
          url: 'http://localhost:3000/api/info',
          method: 'POST',
          dataReq: {
            ...JSON.parse(localStorage.getItem('userData')),
            ...toUpdate,
            act: 'edit'
          }
        })
        commit('setInfo', updateData)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchInfo({ dispatch, commit }) {
      try {
        const response = await dispatch('fetchRequest', {
          url: 'http://localhost:3000/api/info',
          method: 'POST',
          dataReq: {
            ...JSON.parse(localStorage.getItem('userData')),
            act: 'get'
          }
        })
        commit('setInfo', response.info)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    info: s => s.info
  }
}
