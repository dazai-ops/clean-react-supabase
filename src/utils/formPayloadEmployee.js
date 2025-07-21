export const addFormPayload = (formData) => ({
  name: formData.name,
  age: formData.age,
  employee_position_id: formData.position_id,
})

export const updateFormPayload = (formData) => ({
  id: formData.id,
  name: formData.name,
  age: formData.age,
  employee_position_id: formData.position_id,
})