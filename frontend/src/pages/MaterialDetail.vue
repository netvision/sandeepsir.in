<template>
  <div class="material-detail-page">
    <section class="section">
      <div class="container">
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
        </div>

        <div v-else-if="material" class="material-detail">
          <div class="detail-header card">
            <div class="header-content">
              <span class="badge badge-primary">{{ material.type }}</span>
              <h1>{{ material.title }}</h1>
              <p class="material-description">{{ material.description }}</p>
              
              <div class="material-info">
                <div class="info-item">
                  <strong>Class:</strong> {{ material.class?.name }}
                </div>
                <div class="info-item">
                  <strong>Subject:</strong> {{ material.subject?.name }}
                  <span v-if="material.subject?.nameHindi" class="hindi-text">
                    ({{ material.subject.nameHindi }})
                  </span>
                </div>
                <div class="info-item">
                  <strong>Uploaded:</strong> {{ formatDate(material.createdAt) }}
                </div>
              </div>

              <div class="material-stats">
                <div class="stat-item">
                  <span class="stat-icon">👁️</span>
                  <span>{{ material.views }} views</span>
                </div>
                <div class="stat-item">
                  <span class="stat-icon">⬇️</span>
                  <span>{{ material.downloads }} downloads</span>
                </div>
                <div class="stat-item" v-if="material.fileSize">
                  <span class="stat-icon">📦</span>
                  <span>{{ formatFileSize(material.fileSize) }}</span>
                </div>
              </div>

              <div class="action-buttons">
                <a 
                  :href="`http://localhost:5000${material.fileUrl}`" 
                  target="_blank"
                  @click="trackDownload"
                  class="btn btn-primary"
                >
                  📥 Download / View
                </a>
                <router-link to="/materials" class="btn btn-outline">
                  ← Back to Materials
                </router-link>
              </div>
            </div>

            <div v-if="material.thumbnailUrl" class="thumbnail">
              <img :src="`http://localhost:5000${material.thumbnailUrl}`" alt="Thumbnail" />
            </div>
          </div>

          <div v-if="material.tags && material.tags.length > 0" class="tags-section card">
            <h3>Tags</h3>
            <div class="tags">
              <span v-for="tag in material.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <div v-else class="error-state">
          <p>Material not found</p>
          <router-link to="/materials" class="btn btn-primary">
            Back to Materials
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { materialService } from '@/services'

const route = useRoute()
const loading = ref(false)
const material = ref(null)

const loadMaterial = async () => {
  loading.value = true
  try {
    const response = await materialService.getById(route.params.id)
    if (response.data.success) {
      material.value = response.data.data
    }
  } catch (error) {
    console.error('Error loading material:', error)
  } finally {
    loading.value = false
  }
}

const trackDownload = async () => {
  try {
    await materialService.trackDownload(route.params.id)
    if (material.value) {
      material.value.downloads += 1
    }
  } catch (error) {
    console.error('Error tracking download:', error)
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

onMounted(() => {
  loadMaterial()
})
</script>

<style scoped>
.material-detail {
  max-width: 900px;
  margin: 0 auto;
}

.detail-header {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 32px;
  align-items: start;
}

.header-content h1 {
  font-size: 32px;
  color: var(--dark-color);
  margin: 12px 0 16px;
}

.material-description {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 24px;
}

.material-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  padding: 16px;
  background: var(--light-color);
  border-radius: 8px;
}

.info-item {
  font-size: 14px;
}

.info-item strong {
  color: var(--dark-color);
  margin-right: 8px;
}

.material-stats {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  padding: 16px;
  background: var(--light-color);
  border-radius: 8px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.stat-icon {
  font-size: 18px;
}

.action-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.thumbnail {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid var(--border-color);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tags-section h3 {
  color: var(--dark-color);
  margin-bottom: 16px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 6px 12px;
  background: var(--light-color);
  border-radius: 20px;
  font-size: 13px;
  color: var(--primary-color);
  border: 1px solid var(--border-color);
}

.error-state {
  text-align: center;
  padding: 60px 20px;
}

@media (max-width: 768px) {
  .detail-header {
    grid-template-columns: 1fr;
  }

  .thumbnail {
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
  }

  .header-content h1 {
    font-size: 24px;
  }

  .material-stats {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
