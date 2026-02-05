<template>
  <div class="materials-page">
    <section class="section">
      <div class="container">
        <h1 class="page-title">Study Materials</h1>
        <p class="page-subtitle">Browse all available study materials, mind maps, and resources</p>

        <!-- Filters -->
        <div class="filters card">
          <div class="filter-group">
            <label>Class</label>
            <select v-model="filters.class" @change="loadMaterials">
              <option value="">All Classes</option>
              <option v-for="cls in classes" :key="cls._id" :value="cls._id">
                {{ cls.name }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label>Subject</label>
            <select v-model="filters.subject" @change="loadMaterials">
              <option value="">All Subjects</option>
              <option v-for="subject in subjects" :key="subject._id" :value="subject._id">
                {{ subject.name }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label>Type</label>
            <select v-model="filters.type" @change="loadMaterials">
              <option value="">All Types</option>
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
              <option value="mindmap">Mind Map</option>
              <option value="notes">Notes</option>
              <option value="practice-sheet">Practice Sheet</option>
            </select>
          </div>

          <div class="filter-group">
            <label>Search</label>
            <input 
              v-model="filters.search" 
              @input="debounceSearch"
              type="text" 
              placeholder="Search materials..." 
            />
          </div>
        </div>

        <!-- Materials Grid -->
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
        </div>

        <div v-else-if="materials.length === 0" class="empty-state">
          <p>No materials found</p>
        </div>

        <div v-else class="grid grid-3">
          <div v-for="material in materials" :key="material._id" class="material-card card">
            <div class="material-type">
              <span class="badge badge-primary">{{ material.type }}</span>
            </div>
            <h3>{{ material.title }}</h3>
            <p class="material-description">{{ material.description }}</p>
            <div class="material-meta">
              <span>📚 {{ material.class?.name }}</span>
              <span>📖 {{ material.subject?.name }}</span>
            </div>
            <div class="material-stats">
              <span>👁️ {{ material.views }}</span>
              <span>⬇️ {{ material.downloads }}</span>
            </div>
            <router-link :to="`/materials/${material._id}`" class="btn btn-primary btn-sm">
              View Details
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { materialService, classService, subjectService } from '@/services'

const loading = ref(false)
const materials = ref([])
const classes = ref([])
const subjects = ref([])
const filters = ref({
  class: '',
  subject: '',
  type: '',
  search: ''
})

let searchTimeout = null

const loadMaterials = async () => {
  loading.value = true
  try {
    const params = {}
    if (filters.value.class) params.class = filters.value.class
    if (filters.value.subject) params.subject = filters.value.subject
    if (filters.value.type) params.type = filters.value.type
    if (filters.value.search) params.search = filters.value.search

    const response = await materialService.getAll(params)
    if (response.data.success) {
      materials.value = response.data.data
    }
  } catch (error) {
    console.error('Error loading materials:', error)
  } finally {
    loading.value = false
  }
}

const debounceSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    loadMaterials()
  }, 500)
}

onMounted(async () => {
  try {
    const [classResponse, subjectResponse] = await Promise.all([
      classService.getAll(),
      subjectService.getAll()
    ])
    
    if (classResponse.data.success) classes.value = classResponse.data.data
    if (subjectResponse.data.success) subjects.value = subjectResponse.data.data
    
    await loadMaterials()
  } catch (error) {
    console.error('Error loading data:', error)
  }
})
</script>

<style scoped>
.page-title {
  font-size: 36px;
  color: var(--dark-color);
  margin-bottom: 8px;
  text-align: center;
}

.page-subtitle {
  text-align: center;
  color: var(--text-color);
  margin-bottom: 32px;
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.filter-group label {
  font-size: 14px;
  margin-bottom: 4px;
}

.material-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.material-type {
  display: flex;
  justify-content: flex-end;
}

.material-card h3 {
  font-size: 18px;
  color: var(--dark-color);
}

.material-description {
  color: var(--text-color);
  font-size: 14px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.material-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: var(--text-color);
}

.material-stats {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: var(--text-color);
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
}

.btn-sm {
  padding: 8px 16px;
  font-size: 13px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-color);
}

@media (max-width: 768px) {
  .filters {
    grid-template-columns: 1fr;
  }
}
</style>
