import axios from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Files API
export const filesAPI = {
  getAll: (search = '', sort = 'uploadDate') => 
    api.get(`/files?search=${search}&sort=${sort}`),
  
  upload: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  
  getById: (id) => api.get(`/files/${id}`),
  
  rename: (id, newName) => 
    api.put(`/files/rename/${id}`, { newName }),
  
  delete: (id) => api.delete(`/files/${id}`),
  
  download: (id) => api.get(`/files/download/${id}`, {
    responseType: 'blob',
  }),
}

// Notes API
export const notesAPI = {
  getAll: (search = '', sort = 'lastEdited') => 
    api.get(`/notes?search=${search}&sort=${sort}`),
  
  create: (title = '', content = '') => 
    api.post('/notes', { title, content }),
  
  getById: (id) => api.get(`/notes/${id}`),
  
  update: (id, data) => api.put(`/notes/${id}`, data),
  
  delete: (id) => api.delete(`/notes/${id}`),
  
  restore: (id) => api.put(`/notes/${id}/restore`),
}

// Health check
export const healthCheck = () => api.get('/health')

export default api 