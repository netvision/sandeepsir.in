<template>
  <div class="classes-management">
    <div class="actions-bar">
      <button @click="showAddModal = true" class="btn btn-primary">
        ➕ Add New Class
      </button>
    </div>

    <div class="card">
      <h2>Manage Classes</h2>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>

      <div v-else class="classes-grid grid grid-4">
        <div v-for="cls in classes" :key="cls._id" class="class-card card">
          <div class="class-header">
            <h3>{{ cls.name }}</h3>
            <span class="hindi-text">कक्षा {{ cls.classNumber }}</span>
          </div>
          <p>{{ cls.description || 'No description' }}</p>
          <div class="class-actions">
            <button @click="editClass(cls)" class="btn-icon">✏️</button>
            <button @click="deleteClass(cls)" class="btn-icon">🗑️</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || editingClass" class="modal">
      <div class="modal-content card">
        <h2>{{ editingClass ? 'Edit Class' : 'Add New Class' }}</h2>
        
        <form @submit.prevent="saveClass">
          <div class="form-group">
            <label>Class Name *</label>
            <input v-model="classForm.name" type="text" required placeholder="e.g., Class 9" />
          </div>

          <div class="form-group">
            <label>Class Number *</label>
            <input 
              v-model.number="classForm.classNumber" 
              type="number" 
              min="9" 
              max="12" 
              required 
              placeholder="9-12"
            />
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea v-model="classForm.description" rows="3" placeholder="Optional description"></textarea>
          </div>

          <div class="modal-actions">
            <button type="submit" class="btn btn-primary">
              {{ editingClass ? 'Update' : 'Add' }} Class
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
import { classService } from '@/services'
import { useToast } from 'vue-toastification'

const toast = useToast()

const loading = ref(false)
const classes = ref([])
const showAddModal = ref(false)
const editingClass = ref(null)
const classForm = ref({
  name: '',
  classNumber: '',
  description: ''
})

const loadClasses = async () => {
  loading.value = true
  try {
    const response = await classService.getAll()
    if (response.data.success) {
      classes.value = response.data.data
    }
  } catch (error) {
    toast.error('Error loading classes')
  } finally {
    loading.value = false
  }
}

const editClass = (cls) => {
  editingClass.value = cls
  classForm.value = {
    name: cls.name,
    classNumber: cls.classNumber,
    description: cls.description || ''
  }
}

const closeModal = () => {
  showAddModal.value = false
  editingClass.value = null
  classForm.value = {
    name: '',
    classNumber: '',
    description: ''
  }
}

const saveClass = async () => {
  try {
    if (editingClass.value) {
      const response = await classService.update(editingClass.value._id, classForm.value)
      if (response.data.success) {
        toast.success('Class updated successfully')
        await loadClasses()
      }
    } else {
      const response = await classService.create(classForm.value)
      if (response.data.success) {
        toast.success('Class added successfully')
        await loadClasses()
      }
    }
    closeModal()
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error saving class')
  }
}

const deleteClass = async (cls) => {
  if (!confirm(`Are you sure you want to delete ${cls.name}?`)) {
    return
  }

  try {
    const response = await classService.delete(cls._id)
    if (response.data.success) {
      toast.success('Class deleted successfully')
      await loadClasses()
    }
  } catch (error) {
    toast.error('Error deleting class')
  }
}

onMounted(() => {
  loadClasses()
})
</script>

<style scoped>
.classes-management {
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

.class-card {
  position: relative;
}

.class-header {
  margin-bottom: 12px;
}

.class-header h3 {
  color: var(--dark-color);
  margin-bottom: 4px;
}

.class-actions {
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

.modal-actions {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}
</style>
