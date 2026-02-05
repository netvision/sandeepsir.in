import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services'
import { useToast } from 'vue-toastification'

export const useAuthStore = defineStore('auth', () => {
  const toast = useToast()
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  const login = async (credentials) => {
    try {
      loading.value = true
      const response = await authService.login(credentials)
      
      if (response.data.success) {
        token.value = response.data.data.token
        user.value = response.data.data.user
        localStorage.setItem('token', token.value)
        toast.success('Login successful!')
        return true
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
      return false
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    try {
      loading.value = true
      const response = await authService.register(userData)
      
      if (response.data.success) {
        token.value = response.data.data.token
        user.value = response.data.data.user
        localStorage.setItem('token', token.value)
        toast.success('Registration successful!')
        return true
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    toast.info('Logged out successfully')
  }

  const checkAuth = async () => {
    if (!token.value) return
    
    try {
      const response = await authService.getProfile()
      if (response.data.success) {
        user.value = response.data.data.user
      }
    } catch (error) {
      logout()
    }
  }

  return {
    user,
    token,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    checkAuth
  }
})
