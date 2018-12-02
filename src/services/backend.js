import axios from 'axios'

export default {
  getTask (id) {
    console.info(`[services/backend] getTask`, { id })
    return axios.get(`/api/v1/task/${id}`).then(r => r.data)
  },

  getAllTasks (fields = ['*']) {
    console.info(`[services/backend] getAllTasks`, { fields })
    if (!fields || fields === ['*']) {
      fields = ['id', 'title', 'date', 'description', 'author', 'status']
    }
    const params = { fields: fields.join(',') }
    return axios.get('/api/v1/task', { params }).then(r => r.data)
  },

  getTasks (limit = 10, page = 1, fields = ['*'], filter = '') {
    console.info(`[services/backend] getTasks`, { limit, page, fields, filter })
    if (!fields || fields === ['*']) {
      fields = ['id', 'title', 'date', 'description', 'author', 'status']
    }
    const params = { fields: fields.join(',') }
    return axios.get(`/api/v1/task/limit/${limit}/page/${page}`, { params }).then(r => r.data)
  },

  getPages (limit) {
    console.info(`[services/backend] getPages`, { limit })
    return axios.get(`/api/v1/task/pages/${limit}`).then(r => r.data)
  }
}
