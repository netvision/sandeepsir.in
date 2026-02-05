<template>
  <div class="upload-page">
    <div class="upload-card card">
      <h2>Upload New Material</h2>
      
      <form @submit.prevent="handleUpload">
        <div class="form-row">
          <div class="form-group">
            <label>Title *</label>
            <input v-model="form.title" type="text" required placeholder="Enter material title" />
          </div>

          <div class="form-group">
            <label>Type *</label>
            <select v-model="form.type" required>
              <option value="">Select type</option>
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
              <option value="mindmap">Mind Map</option>
              <option value="notes">Notes</option>
              <option value="practice-sheet">Practice Sheet</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Description *</label>
          <textarea v-model="form.description" rows="4" required placeholder="Enter material description"></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Class *</label>
            <select v-model="form.class" required>
              <option value="">Select class</option>
              <option v-for="cls in classes" :key="cls._id" :value="cls._id">
                {{ cls.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Subject *</label>
            <select v-model="form.subject" required>
              <option value="">Select subject</option>
              <option v-for="subject in subjects" :key="subject._id" :value="subject._id">
                {{ subject.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Tags (comma separated)</label>
          <input v-model="form.tags" type="text" placeholder="e.g., chapter1, important, exam" />
        </div>

        <div class="form-group">
          <label>Material File *</label>
          <input 
            type="file" 
            @change="handleFileChange"
            accept=".pdf,.doc,.docx,.mp4,.avi"
            required 
          />
          <small>Supported formats: PDF, DOC, DOCX, MP4, AVI (Max 100MB)</small>
        </div>

        <div class="form-group">
          <label>Thumbnail (optional)</label>
          <input 
            type="file" 
            @change="handleThumbnailChange"
            accept="image/*"
          />
          <small>Recommended size: 400x300px</small>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="uploading">
            {{ uploading ? 'Uploading...' : 'Upload Material' }}
          </button>
          <router-link to="/admin/materials" class="btn btn-outline">
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMaterialStore } from '@/stores/material'
import { classService, subjectService } from '@/services'
import { useToast } from 'vue-toastification'

const router = useRouter()
const materialStore = useMaterialStore()
const toast = useToast()

const form = ref({
  title: '',
  description: '',
  class: '',
  subject: '',
  type: '',
  tags: ''
})

const file = ref(null)
const thumbnail = ref(null)
const uploading = ref(false)
const classes = ref([])
const subjects = ref([])

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0]
  if (selectedFile && selectedFile.size > 100 * 1024 * 1024) {
    toast.error('File size should not exceed 100MB')
    event.target.value = ''
    return
  }
  file.value = selectedFile
}

const handleThumbnailChange = (event) => {
  thumbnail.value = event.target.files[0]
}

const handleUpload = async () => {
  if (!file.value) {
    toast.error('Please select a file')
    return
  }

  uploading.value = true

  const formData = new FormData()
  formData.append('title', form.value.title)
  formData.append('description', form.value.description)
  formData.append('class', form.value.class)
  formData.append('subject', form.value.subject)
  formData.append('type', form.value.type)
  
  if (form.value.tags) {
    formData.append('tags', JSON.stringify(form.value.tags.split(',').map(t => t.trim())))
  }
  
  formData.append('file', file.value)
  
  if (thumbnail.value) {
    formData.append('thumbnail', thumbnail.value)
  }

  const success = await materialStore.createMaterial(formData)
  uploading.value = false

  if (success) {
    router.push('/admin/materials')
  }
}

onMounted(async () => {
  try {
    const [classResponse, subjectResponse] = await Promise.all([
      classService.getAll(),
      subjectService.getAll()
    ])
    
    if (classResponse.data.success) classes.value = classResponse.data.data
    if (subjectResponse.data.success) subjects.value = subjectResponse.data.data
  } catch (error) {
    toast.error('Error loading form data')
  }
})
</script>

<style scoped>
.upload-card h2 {
  color: var(--dark-color);
  margin-bottom: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

small {
  display: block;
  margin-top: 4px;
  color: var(--text-color);
  font-size: 12px;
}

.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 32px;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
