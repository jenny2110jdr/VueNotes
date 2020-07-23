import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:1234/',
  json: true
})

export default {
  async execute (method, resource, data) {
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data
    })
  },
  getNotes () {
    return this.execute('get', '/notes')
  },
  getNote (id) {
    return this.execute('get', `/notes/${id}`)
  },
  createNote (data) {
    return this.execute('post', '/notes', data)
  },
  updateNote (id, data) {
    return this.execute('put', `/notes/${id}`, data)
  },
  deleteNote (id) {
    return this.execute('delete', `/notes/${id}`)
  }
}
