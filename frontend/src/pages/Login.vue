<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card card">
        <h1>Admin Login</h1>
        <p>Sign in to access the admin panel</p>

        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label>Email</label>
            <input 
              v-model="credentials.email" 
              type="email" 
              placeholder="Enter your email"
              required 
            />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input 
              v-model="credentials.password" 
              type="password" 
              placeholder="Enter your password"
              required 
            />
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <div class="login-footer">
          <router-link to="/" class="back-link">← Back to Home</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const credentials = ref({
  email: '',
  password: ''
})

const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  const success = await authStore.login(credentials.value)
  loading.value = false
  
  if (success) {
    router.push('/admin')
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  text-align: center;
}

.login-card h1 {
  font-size: 28px;
  color: var(--dark-color);
  margin-bottom: 8px;
}

.login-card > p {
  color: var(--text-color);
  margin-bottom: 32px;
}

form {
  text-align: left;
}

.form-group {
  margin-bottom: 20px;
}

.btn-block {
  width: 100%;
  margin-top: 8px;
}

.login-footer {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.back-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
