<template>
  <div class="main-layout">
    <header class="header">
      <div class="container">
        <nav class="navbar">
          <router-link to="/" class="logo">
            <img src="/sandeepsir.jpeg" alt="Sandeep Sir" class="logo-img" />
            <div>
              <h1 class="logo-title">Sandeep Sir Classes</h1>
              <p class="logo-subtitle hindi-text">संदीप सर क्लासेज</p>
            </div>
          </router-link>
          
          <div class="nav-links">
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/materials" class="nav-link">Materials</router-link>
            <router-link to="/about" class="nav-link">About Us</router-link>
            <router-link v-if="!isAuthenticated" to="/login" class="btn btn-primary">Admin Login</router-link>
            <router-link v-else to="/admin" class="btn btn-primary">Dashboard</router-link>
          </div>

          <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">
            ☰
          </button>
        </nav>

        <div v-if="mobileMenuOpen" class="mobile-menu">
          <router-link to="/" class="mobile-link" @click="mobileMenuOpen = false">Home</router-link>
          <router-link to="/materials" class="mobile-link" @click="mobileMenuOpen = false">Materials</router-link>
          <router-link to="/about" class="mobile-link" @click="mobileMenuOpen = false">About Us</router-link>
          <router-link v-if="!isAuthenticated" to="/login" class="mobile-link" @click="mobileMenuOpen = false">Admin Login</router-link>
          <router-link v-else to="/admin" class="mobile-link" @click="mobileMenuOpen = false">Dashboard</router-link>
        </div>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Sandeep Sir Classes</h3>
            <p class="hindi-text">शिक्षा के क्षेत्र में एक ऐसी अग्रणी संस्था जो केवल सेवाभाव से प्रेरित है</p>
          </div>
          <div class="footer-section">
            <h4>Quick Links</h4>
            <router-link to="/" class="footer-link">Home</router-link>
            <router-link to="/materials" class="footer-link">Materials</router-link>
            <router-link to="/about" class="footer-link">About Us</router-link>
          </div>
          <div class="footer-section">
            <h4>Contact</h4>
            <p>sandeepsir.in</p>
            <p>Free Education for All</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 Sandeep Sir Classes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const mobileMenuOpen = ref(false)
const isAuthenticated = computed(() => authStore.isAuthenticated)
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: white;
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  color: var(--dark-color);
}

.logo-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.logo-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.logo-subtitle {
  font-size: 14px;
  color: var(--text-color);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary-color);
}

.mobile-menu-btn {
  display: none;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.mobile-menu {
  display: none;
}

.main-content {
  flex: 1;
}

.footer {
  background: var(--dark-color);
  color: white;
  padding: 48px 0 24px;
  margin-top: 60px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 48px;
  margin-bottom: 32px;
}

.footer-section h3 {
  margin-bottom: 16px;
}

.footer-section h4 {
  margin-bottom: 16px;
  color: var(--primary-color);
}

.footer-section p {
  margin-bottom: 8px;
  opacity: 0.9;
}

.footer-link {
  display: block;
  color: white;
  text-decoration: none;
  margin-bottom: 8px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.footer-link:hover {
  opacity: 1;
  color: var(--primary-color);
}

.footer-bottom {
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.8;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    padding: 16px 0;
  }

  .mobile-link {
    padding: 12px 0;
    text-decoration: none;
    color: var(--text-color);
    font-weight: 500;
  }

  .logo-img {
    width: 50px;
    height: 50px;
  }

  .logo-title {
    font-size: 16px;
  }

  .logo-subtitle {
    font-size: 12px;
  }
}
</style>
