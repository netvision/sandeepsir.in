<template>
  <div class="materials-management">
    <div class="actions-bar">
      <router-link to="/admin/upload" class="btn btn-primary">
        ⬆️ Upload New Material
      </router-link>
    </div>

    <div class="card">
      <h2>All Materials</h2>

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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="material in materials" :key="material._id">
              <td>{{ material.title }}</td>
              <td>{{ material.class?.name }}</td>
              <td>{{ material.subject?.name }}</td>
              <td><span class="badge badge-primary">{{ material.type }}</span></td>
              <td>{{ material.views }}</td>
              <td>{{ material.downloads }}</td>
              <td>
                <span :class="['badge', material.isActive ? 'badge-success' : 'badge-warning']">
                  {{ material.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button @click="toggleStatus(material)" class="btn-icon" title="Toggle Status">
                    {{ material.isActive ? '🔒' : '🔓' }}
                  </button>
                  <button @click="deleteMaterial(material)" class="btn-icon" title="Delete">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="materials.length === 0" class="empty-state">
          <p>No materials uploaded yet</p>
          <router-link to="/admin/upload" class="btn btn-primary">
            Upload First Material
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMaterialStore } from '@/stores/material'
import { useToast } from 'vue-toastification'

const materialStore = useMaterialStore()
const toast = useToast()

const loading = ref(false)
const materials = ref([])

const loadMaterials = async () => {
  loading.value = true
  await materialStore.fetchMaterials()
  materials.value = materialStore.materials
  loading.value = false
}

const toggleStatus = async (material) => {
  const success = await materialStore.updateMaterial(material._id, {
    isActive: !material.isActive
  })
  
  if (success) {
    material.isActive = !material.isActive
  }
}

const deleteMaterial = async (material) => {
  if (!confirm(`Are you sure you want to delete "${material.title}"?`)) {
    return
  }

  const success = await materialStore.deleteMaterial(material._id)
  if (success) {
    materials.value = materials.value.filter(m => m._id !== material._id)
  }
}

onMounted(() => {
  loadMaterials()
})
</script>

<style scoped>
.materials-management {
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

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-icon {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  transition: transform 0.2s;
}

.btn-icon:hover {
  transform: scale(1.2);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-color);
}
</style>
