<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>Admin Panel</h2>
        <p>{{ user?.name }}</p>
      </div>
      
      <nav class="sidebar-nav">
        <router-link to="/admin" class="sidebar-link">
          📊 Dashboard
        </router-link>
        <router-link to="/admin/materials" class="sidebar-link">
          📚 Materials
        </router-link>
        <router-link to="/admin/upload" class="sidebar-link">
          ⬆️ Upload Material
        </router-link>
        <router-link to="/admin/classes" class="sidebar-link">
          🎓 Classes
        </router-link>
        <router-link to="/admin/subjects" class="sidebar-link">
          📖 Subjects
        </router-link>
        <a href="/" class="sidebar-link">
          🌐 View Website
        </a>
        <button @click="handleLogout" class="sidebar-link logout-btn">
          🚪 Logout
        </button>
      </nav>
    </aside>

    <div class="admin-main">
      <header class="admin-header">
        <h1>{{ pageTitle }}</h1>
      </header>
      
      <main class="admin-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const pageTitle = computed(() => {
  const titles = {
    'AdminDashboard': 'Dashboard',
    'AdminMaterials': 'Manage Materials',
    'AdminUpload': 'Upload Material',
    'AdminClasses': 'Manage Classes',
    'AdminSubjects': 'Manage Subjects'
  }
  return titles[route.name] || 'Admin'
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background: var(--dark-color);
  color: white;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-header {
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h2 {
  margin-bottom: 8px;
}

.sidebar-header p {
  opacity: 0.8;
  font-size: 14px;
}

.sidebar-nav {
  padding: 16px 0;
}

.sidebar-link {
  display: block;
  padding: 12px 24px;
  color: white;
  text-decoration: none;
  transition: background 0.3s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
}

.sidebar-link:hover,
.sidebar-link.router-link-active {
  background: rgba(255, 255, 255, 0.1);
}

.logout-btn {
  margin-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 24px;
}

.admin-main {
  margin-left: 260px;
  flex: 1;
  background: var(--light-color);
}

.admin-header {
  background: white;
  padding: 24px 32px;
  box-shadow: var(--shadow);
}

.admin-header h1 {
  font-size: 24px;
  color: var(--dark-color);
}

.admin-content {
  padding: 32px;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    position: relative;
    height: auto;
  }

  .admin-main {
    margin-left: 0;
  }
}
</style>
