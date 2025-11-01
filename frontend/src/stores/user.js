// src/stores/user.js
import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useUserStore = defineStore('user', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)

  async function login(email, password) {
    try {
      const { data } = await api.post('/login', { email, password })
      user.value = data.user
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
    } catch (err) {
      throw new Error('Login failed: ' + err.message)
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  function setUser(userInfo) {
    user.value = userInfo
    localStorage.setItem('user', JSON.stringify(userInfo))
  }

  return { user, login, logout, setUser }
})
