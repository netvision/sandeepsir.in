<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Welcome to Sandeep Sir Classes</h1>
          <p class="hero-subtitle hindi-text">शिक्षा का लोकीकरण - निःशुल्क शिक्षा सभी के लिए</p>
          <p class="hero-description">
            Free study materials, mind maps, and resources for students of Class 9 to 12
          </p>
          <div class="hero-buttons">
            <router-link to="/materials" class="btn btn-primary">Explore Materials</router-link>
            <router-link to="/about" class="btn btn-outline">Learn More</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Classes Section -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Select Your Class</h2>
        <p class="section-subtitle">Choose your class to access study materials</p>
        
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
        </div>

        <div v-else class="grid grid-4">
          <router-link 
            v-for="classItem in classes" 
            :key="classItem._id"
            :to="`/class/${classItem._id}`"
            class="class-card card"
          >
            <div class="class-icon">🎓</div>
            <h3>{{ classItem.name }}</h3>
            <p class="hindi-text">कक्षा {{ classItem.classNumber }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section" style="background: white;">
      <div class="container">
        <h2 class="section-title">What We Offer</h2>
        <div class="grid grid-3">
          <div class="feature-card card">
            <div class="feature-icon">📚</div>
            <h3>Study Materials</h3>
            <p>Comprehensive notes and materials for all subjects</p>
          </div>
          <div class="feature-card card">
            <div class="feature-icon">🗺️</div>
            <h3>Mind Maps</h3>
            <p>Visual learning aids to help memorize concepts</p>
          </div>
          <div class="feature-card card">
            <div class="feature-icon">📝</div>
            <h3>Practice Sheets</h3>
            <p>Practice questions to test your knowledge</p>
          </div>
          <div class="feature-card card">
            <div class="feature-icon">🎥</div>
            <h3>Video Lessons</h3>
            <p>Clear explanations through video tutorials</p>
          </div>
          <div class="feature-card card">
            <div class="feature-icon">💯</div>
            <h3>100% Free</h3>
            <p>All resources are completely free for everyone</p>
          </div>
          <div class="feature-card card">
            <div class="feature-icon">🌟</div>
            <h3>Quality Content</h3>
            <p>Curated by experienced educators</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="section stats-section">
      <div class="container">
        <div class="grid grid-3">
          <div class="stat-card">
            <div class="stat-number">{{ materialCount }}</div>
            <div class="stat-label">Study Materials</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">4</div>
            <div class="stat-label">Classes (9-12)</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">100%</div>
            <div class="stat-label">Free Access</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { classService, materialService } from '@/services'

const loading = ref(false)
const classes = ref([])
const materialCount = ref(0)

onMounted(async () => {
  loading.value = true
  try {
    const [classResponse, materialResponse] = await Promise.all([
      classService.getAll(),
      materialService.getAll()
    ])
    
    if (classResponse.data.success) {
      classes.value = classResponse.data.data
    }
    
    if (materialResponse.data.success) {
      materialCount.value = materialResponse.data.count
    }
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  padding: 100px 0;
  text-align: center;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 24px;
  margin-bottom: 16px;
  opacity: 0.9;
}

.hero-description {
  font-size: 18px;
  margin-bottom: 32px;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.class-card {
  text-align: center;
  text-decoration: none;
  color: var(--dark-color);
  transition: all 0.3s ease;
}

.class-card:hover {
  transform: translateY(-8px);
}

.class-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.class-card h3 {
  font-size: 20px;
  margin-bottom: 8px;
}

.feature-card {
  text-align: center;
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 20px;
  margin-bottom: 12px;
  color: var(--dark-color);
}

.feature-card p {
  color: var(--text-color);
}

.stats-section {
  background: var(--dark-color);
  color: white;
}

.stat-card {
  text-align: center;
}

.stat-number {
  font-size: 48px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.stat-label {
  font-size: 18px;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 18px;
  }
  
  .hero-description {
    font-size: 16px;
  }

  .stat-number {
    font-size: 36px;
  }
}
</style>
