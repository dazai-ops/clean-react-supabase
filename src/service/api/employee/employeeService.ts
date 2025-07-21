import { addFormPayload, updateFormPayload } from "../../../utils/formPayloadEmployee"
import { supabase } from "../../supabaseClient"

export const retriveEmployees = async () => {
  const result = await supabase.from('employees').select('*').order('id', { ascending: true })
  if(result.error) throw result.error
  return result
}

export const deleteEmployee = async (id: number) => {
  const result = await supabase.from('employees').delete().eq('id', id)
  if(result.error) throw result.error
  return result
}

export const createEmployee = async (formData: object) => {
  const payload = addFormPayload(formData)
  const response = await supabase.from('employees').insert(payload).select()
  if(response.error) throw response.error
  return response
}

export const updateEmployee = async (formData) => {
  const payload = updateFormPayload(formData)
  const response = await supabase.from('employees').update(payload).eq('id', formData.id).select()
  if(response.error) throw response.error
  return response
}