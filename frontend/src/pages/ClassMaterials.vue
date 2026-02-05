<template>
  <div class="class-materials-page">
    <section class="section">
      <div class="container">
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
        </div>

        <div v-else>
          <div class="class-header card">
            <h1>{{ classData?.name }}</h1>
            <p class="hindi-text">कक्षा {{ classData?.classNumber }}</p>
          </div>

          <div class="materials-by-subject">
            <div v-for="subject in subjectsWithMaterials" :key="subject._id" class="subject-section">
              <h2 class="subject-title">
                {{ subject.name }}
                <span v-if="subject.nameHindi" class="hindi-text">({{ subject.nameHindi }})</span>
              </h2>

              <div class="grid grid-3">
                <div v-for="material in subject.materials" :key="material._id" class="material-card card">
                  <span class="badge badge-primary">{{ material.type }}</span>
                  <h3>{{ material.title }}</h3>
                  <p class="material-description">{{ material.description }}</p>
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

            <div v-if="subjectsWithMaterials.length === 0" class="empty-state">
              <p>No materials available for this class yet</p>
              <router-link to="/materials" class="btn btn-primary">
                Browse All Materials
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { classService, subjectService, materialService } from '@/services'

const route = useRoute()
const loading = ref(false)
const classData = ref(null)
const subjectsWithMaterials = ref([])

const loadClassMaterials = async () => {
  loading.value = true
  try {
    const classId = route.params.classId

    const [classResponse, subjectsResponse, materialsResponse] = await Promise.all([
      classService.getById(classId),
      subjectService.getAll({ class: classId }),
      materialService.getAll({ class: classId })
    ])

    if (classResponse.data.success) {
      classData.value = classResponse.data.data
    }

    if (subjectsResponse.data.success && materialsResponse.data.success) {
      const subjects = subjectsResponse.data.data
      const materials = materialsResponse.data.data

      subjectsWithMaterials.value = subjects.map(subject => ({
        ...subject,
        materials: materials.filter(m => m.subject?._id === subject._id)
      })).filter(s => s.materials.length > 0)
    }
  } catch (error) {
    console.error('Error loading class materials:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadClassMaterials()
})
</script>

<style scoped>
.class-header {
  text-align: center;
  margin-bottom: 32px;
}

.class-header h1 {
  font-size: 36px;
  color: var(--dark-color);
  margin-bottom: 8px;
}

.subject-section {
  margin-bottom: 48px;
}

.subject-title {
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border-color);
}

.material-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
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
}
</style>
