export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        const response = await dispatch('fetchRequest', {
          url: 'http://localhost:3000/api/login',
          method: 'POST',
          dataReq: {
            email,
            password
          }
        })
        localStorage.setItem('userData', JSON.stringify(response))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register({dispatch, commit}, {email, password, name}) {
      try {
        const response = await dispatch('fetchRequest', {
          url: 'http://localhost:3000/api/register',
          method: 'POST',
          dataReq: {
            email,
            password,
            name
          }
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async logout({commit}) {
      await localStorage.removeItem('userData')
      commit('clearInfo')
    }
  }
}
