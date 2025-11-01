import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
})

export default api

export const submitVacationRequest = async (requestData) => {
  try {
    const { data } = await api.post('/requests', requestData)
    return data
  } catch (err) {
    throw new Error('Error submitting vacation request: ' + (err.message || err))
  }
}

export const getVacationRequests = async (params = {}) => {
  try {
    const { data } = await api.get('/requests', { params })
    return data
  } catch (err) {
    throw new Error('Error retrieving vacation requests: ' + (err.message || err))
  }
}

export const approveVacationRequest = async (requestId, comments = '') => {
  try {
    const { data } = await api.patch(`/requests/${requestId}`, { status: 'approved', comments })
    return data
  } catch (err) {
    throw new Error('Error approving vacation request: ' + (err.message || err))
  }
}

export const rejectVacationRequest = async (requestId, comments = '') => {
  try {
    const { data } = await api.patch(`/requests/${requestId}`, { status: 'rejected', comments })
    return data
  } catch (err) {
    throw new Error('Error rejecting vacation request: ' + (err.message || err))
  }
}