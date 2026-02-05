import api from './api'

export const authService = {
  login(credentials) {
    return api.post('/auth/login', credentials)
  },
  
  register(userData) {
    return api.post('/auth/register', userData)
  },
  
  getProfile() {
    return api.get('/auth/me')
  },
  
  logout() {
    return api.post('/auth/logout')
  }
}

export const materialService = {
  getAll(params) {
    return api.get('/materials', { params })
  },
  
  getById(id) {
    return api.get(`/materials/${id}`)
  },
  
  create(formData) {
    return api.post('/materials', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  update(id, data) {
    return api.put(`/materials/${id}`, data)
  },
  
  delete(id) {
    return api.delete(`/materials/${id}`)
  },
  
  trackDownload(id) {
    return api.post(`/materials/${id}/download`)
  }
}

export const classService = {
  getAll() {
    return api.get('/classes')
  },
  
  getById(id) {
    return api.get(`/classes/${id}`)
  },
  
  create(data) {
    return api.post('/classes', data)
  },
  
  update(id, data) {
    return api.put(`/classes/${id}`, data)
  },
  
  delete(id) {
    return api.delete(`/classes/${id}`)
  }
}

export const subjectService = {
  getAll(params) {
    return api.get('/subjects', { params })
  },
  
  getById(id) {
    return api.get(`/subjects/${id}`)
  },
  
  create(data) {
    return api.post('/subjects', data)
  },
  
  update(id, data) {
    return api.put(`/subjects/${id}`, data)
  },
  
  delete(id) {
    return api.delete(`/subjects/${id}`)
  }
}
