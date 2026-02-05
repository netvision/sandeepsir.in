<template>
  <div class="subjects-management">
    <div class="actions-bar">
      <button @click="showAddModal = true" class="btn btn-primary">
        ➕ Add New Subject
      </button>
    </div>

    <div class="card">
      <h2>Manage Subjects</h2>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>

      <div v-else class="subjects-grid grid grid-3">
        <div v-for="subject in subjects" :key="subject._id" class="subject-card card">
          <div class="subject-header">
            <h3>{{ subject.name }}</h3>
            <p class="hindi-text" v-if="subject.nameHindi">{{ subject.nameHindi }}</p>
          </div>
          <p class="subject-code">Code: {{ subject.code }}</p>
          <div class="subject-actions">
            <button @click="editSubject(subject)" class="btn-icon">✏️</button>
            <button @click="deleteSubject(subject)" class="btn-icon">🗑️</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || editingSubject" class="modal">
      <div class="modal-content card">
        <h2>{{ editingSubject ? 'Edit Subject' : 'Add New Subject' }}</h2>
        
        <form @submit.prevent="saveSubject">
          <div class="form-group">
            <label>Subject Name *</label>
            <input v-model="subjectForm.name" type="text" required placeholder="e.g., Mathematics" />
          </div>

          <div class="form-group">
            <label>Subject Name (Hindi)</label>
            <input 
              v-model="subjectForm.nameHindi" 
              type="text" 
              class="hindi-text"
              placeholder="e.g., गणित" 
            />
          </div>

          <div class="form-group">
            <label>Subject Code *</label>
            <input 
              v-model="subjectForm.code" 
              type="text" 
              required 
              placeholder="e.g., MATH9" 
            />
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea v-model="subjectForm.description" rows="3" placeholder="Optional description"></textarea>
          </div>

          <div class="form-group">
            <label>Applicable Classes</label>
            <div class="checkbox-group">
              <label v-for="cls in classes" :key="cls._id" class="checkbox-label">
                <input 
                  type="checkbox" 
                  :value="cls._id"
                  v-model="subjectForm.classes"
                />
                {{ cls.name }}
              </label>
            </div>
          </div>

          <div class="modal-actions">
            <button type="submit" class="btn btn-primary">
              {{ editingSubject ? 'Update' : 'Add' }} Subject
            </button>
            <button type="button" @click="closeModal" class="btn btn-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { subjectService, classService } from '@/services'
import { useToast } from 'vue-toastification'

const toast = useToast()

const loading = ref(false)
const subjects = ref([])
const classes = ref([])
const showAddModal = ref(false)
const editingSubject = ref(null)
const subjectForm = ref({
  name: '',
  nameHindi: '',
  code: '',
  description: '',
  classes: []
})

const loadSubjects = async () => {
  loading.value = true
  try {
    const response = await subjectService.getAll()
    if (response.data.success) {
      subjects.value = response.data.data
    }
  } catch (error) {
    toast.error('Error loading subjects')
  } finally {
    loading.value = false
  }
}

const loadClasses = async () => {
  try {
    const response = await classService.getAll()
    if (response.data.success) {
      classes.value = response.data.data
    }
  } catch (error) {
    toast.error('Error loading classes')
  }
}

const editSubject = (subject) => {
  editingSubject.value = subject
  subjectForm.value = {
    name: subject.name,
    nameHindi: subject.nameHindi || '',
    code: subject.code,
    description: subject.description || '',
    classes: subject.classes?.map(c => c._id) || []
  }
}

const closeModal = () => {
  showAddModal.value = false
  editingSubject.value = null
  subjectForm.value = {
    name: '',
    nameHindi: '',
    code: '',
    description: '',
    classes: []
  }
}

const saveSubject = async () => {
  try {
    if (editingSubject.value) {
      const response = await subjectService.update(editingSubject.value._id, subjectForm.value)
      if (response.data.success) {
        toast.success('Subject updated successfully')
        await loadSubjects()
      }
    } else {
      const response = await subjectService.create(subjectForm.value)
      if (response.data.success) {
        toast.success('Subject added successfully')
        await loadSubjects()
      }
    }
    closeModal()
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error saving subject')
  }
}

const deleteSubject = async (subject) => {
  if (!confirm(`Are you sure you want to delete ${subject.name}?`)) {
    return
  }

  try {
    const response = await subjectService.delete(subject._id)
    if (response.data.success) {
      toast.success('Subject deleted successfully')
      await loadSubjects()
    }
  } catch (error) {
    toast.error('Error deleting subject')
  }
}

onMounted(() => {
  loadSubjects()
  loadClasses()
})
</script>

<style scoped>
.subjects-management {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.actions-bar {
  display: flex;
  justify-content: flex-end;
}

.card h2 {
  color: var(--dark-color);
  margin-bottom: 20px;
}

.subject-card {
  position: relative;
}

.subject-header h3 {
  color: var(--dark-color);
  margin-bottom: 4px;
}

.subject-code {
  font-size: 13px;
  color: var(--text-color);
  font-family: monospace;
}

.subject-actions {
  display: flex;
  gap: 8px;
  position: absolute;
  top: 16px;
  right: 16px;
}

.btn-icon {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content h2 {
  color: var(--dark-color);
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  cursor: pointer;
}

.modal-actions {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}
</style>
