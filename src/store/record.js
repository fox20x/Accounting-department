import firebase from 'firebase/app'

function uid() {
  return JSON.parse(localStorage.getItem('userData')).userId
}

export default {
  actions: {
    async createRecord({dispatch, commit}, record) {
      try {
        await dispatch('fetchRequest', {
          url: 'http://localhost:3000/api/record',
          method: 'POST',
          dataReq: {
            userId: uid(),
            record,
            act: 'create'
          }
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const response = await dispatch('fetchRequest', {
          url: 'http://localhost:3000/api/record',
          method: 'POST',
          dataReq: {
            userId: uid(),
            act: 'get'
          }
        })
        return response.records
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById({dispatch, commit}, id) {
      try {
        const record = await dispatch('fetchRecords')
        return {...record.find(r => r._id === id), id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
