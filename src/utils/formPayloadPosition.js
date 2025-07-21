export const addFormPayload = (formData) => ({
  position_name: formData.name,
})

export const updateFormPayload = (formData) => ({
  id: formData.id,
  position_name: formData.position_name
})