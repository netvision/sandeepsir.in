<template>
  <div class="dashboard">
    <div class="stats-grid grid grid-4">
      <div class="stat-card card">
        <div class="stat-icon">📚</div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.totalMaterials }}</div>
          <div class="stat-label">Total Materials</div>
        </div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon">👁️</div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.totalViews }}</div>
          <div class="stat-label">Total Views</div>
        </div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon">⬇️</div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.totalDownloads }}</div>
          <div class="stat-label">Total Downloads</div>
        </div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon">🎓</div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.totalClasses }}</div>
          <div class="stat-label">Classes</div>
        </div>
      </div>
    </div>

    <div class="recent-section">
      <div class="card">
        <h2>Recent Materials</h2>
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
        </div>
        <div v-else class="materials-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Type</th>
                <th>Views</th>
                <th>Downloads</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="material in recentMaterials" :key="material._id">
                <td>{{ material.title }}</td>
                <td>{{ material.class?.name }}</td>
                <td>{{ material.subject?.name }}</td>
                <td><span class="badge badge-primary">{{ material.type }}</span></td>
                <td>{{ material.views }}</td>
                <td>{{ material.downloads }}</td>
                <td>{{ formatDate(material.createdAt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="quick-actions">
      <h2>Quick Actions</h2>
      <div class="grid grid-3">
        <router-link to="/admin/upload" class="action-card card">
          <div class="action-icon">⬆️</div>
          <h3>Upload Material</h3>
          <p>Add new study material</p>
        </router-link>

        <router-link to="/admin/materials" class="action-card card">
          <div class="action-icon">📚</div>
          <h3>Manage Materials</h3>
          <p>View and edit materials</p>
        </router-link>

        <router-link to="/admin/classes" class="action-card card">
          <div class="action-icon">🎓</div>
          <h3>Manage Classes</h3>
          <p>Add or edit classes</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { materialService, classService } from '@/services'

const loading = ref(false)
const stats = ref({
  totalMaterials: 0,
  totalViews: 0,
  totalDownloads: 0,
  totalClasses: 0
})
const recentMaterials = ref([])

const loadDashboardData = async () => {
  loading.value = true
  try {
    const [materialsResponse, classesResponse] = await Promise.all([
      materialService.getAll(),
      classService.getAll()
    ])

    if (materialsResponse.data.success) {
      const materials = materialsResponse.data.data
      stats.value.totalMaterials = materials.length
      stats.value.totalViews = materials.reduce((sum, m) => sum + m.views, 0)
      stats.value.totalDownloads = materials.reduce((sum, m) => sum + m.downloads, 0)
      recentMaterials.value = materials.slice(0, 10)
    }

    if (classesResponse.data.success) {
      stats.value.totalClasses = classesResponse.data.data.length
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.stats-grid {
  gap: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-icon {
  font-size: 48px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  color: var(--text-color);
  font-size: 14px;
}

.recent-section h2 {
  margin-bottom: 20px;
  color: var(--dark-color);
}

.materials-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 12px;
  border-bottom: 2px solid var(--border-color);
  font-weight: 600;
  color: var(--dark-color);
}

td {
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
}

.quick-actions h2 {
  margin-bottom: 20px;
  color: var(--dark-color);
}

.action-card {
  text-align: center;
  text-decoration: none;
  color: var(--dark-color);
}

.action-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.action-card h3 {
  margin-bottom: 8px;
  color: var(--primary-color);
}

.action-card p {
  color: var(--text-color);
  font-size: 14px;
}
</style>
