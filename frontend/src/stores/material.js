import { defineStore } from 'pinia'
import { ref } from 'vue'
import { materialService } from '@/services'
import { useToast } from 'vue-toastification'

export const useMaterialStore = defineStore('material', () => {
  const toast = useToast()
  const materials = ref([])
  const currentMaterial = ref(null)
  const loading = ref(false)

  const fetchMaterials = async (filters = {}) => {
    try {
      loading.value = true
      const response = await materialService.getAll(filters)
      
      if (response.data.success) {
        materials.value = response.data.data
      }
    } catch (error) {
      toast.error('Failed to fetch materials')
    } finally {
      loading.value = false
    }
  }

  const fetchMaterialById = async (id) => {
    try {
      loading.value = true
      const response = await materialService.getById(id)
      
      if (response.data.success) {
        currentMaterial.value = response.data.data
      }
    } catch (error) {
      toast.error('Failed to fetch material details')
    } finally {
      loading.value = false
    }
  }

  const createMaterial = async (formData) => {
    try {
      loading.value = true
      const response = await materialService.create(formData)
      
      if (response.data.success) {
        toast.success('Material uploaded successfully!')
        return true
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed')
      return false
    } finally {
      loading.value = false
    }
  }

  const updateMaterial = async (id, data) => {
    try {
      loading.value = true
      const response = await materialService.update(id, data)
      
      if (response.data.success) {
        toast.success('Material updated successfully!')
        return true
      }
    } catch (error) {
      toast.error('Failed to update material')
      return false
    } finally {
      loading.value = false
    }
  }

  const deleteMaterial = async (id) => {
    try {
      loading.value = true
      const response = await materialService.delete(id)
      
      if (response.data.success) {
        materials.value = materials.value.filter(m => m._id !== id)
        toast.success('Material deleted successfully!')
        return true
      }
    } catch (error) {
      toast.error('Failed to delete material')
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    materials,
    currentMaterial,
    loading,
    fetchMaterials,
    fetchMaterialById,
    createMaterial,
    updateMaterial,
    deleteMaterial
  }
})
