import firebase from 'firebase/app'

export default {
  actions: {
    async fetchCategories({commit, dispatch}) {
      try {
        const categories = await dispatch('fetchRequest', {
          url: 'http://localhost:3000/api/category',
          method: 'POST',
          dataReq: {
            userId: JSON.parse(localStorage.getItem('userData')).userId,
            act: 'get'
          }
        }) || {}
        return Object.keys(categories).map(key => ({...categories[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById({commit, dispatch}, id) {
      try {
        const category = await dispatch('fetchCategories') || {}
        return {...category.find(c => c._id === id), id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({commit, dispatch}, {title, limit, id}) {
      try {
        await dispatch('fetchRequest', {
          url: 'http://localhost:3000/api/category',
          method: 'POST',
          dataReq: {
            userId: JSON.parse(localStorage.getItem('userData')).userId,
            title,
            limit,
            id,
            act: 'edit'
          }
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory({commit, dispatch}, {title, limit}) {
      try {
        const category = await dispatch('fetchRequest', {
          url: 'http://localhost:3000/api/category',
          method: 'POST',
          dataReq: {
            userId: JSON.parse(localStorage.getItem('userData')).userId,
            title,
            limit,
            act: 'create'
          }
        })
        return {title, limit, id: category.key}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
