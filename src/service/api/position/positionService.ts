import { addFormPayload, updateFormPayload } from "../../../utils/formPayloadPosition"
import { supabase } from "../../supabaseClient"
  
export const retrivePositions = async () => {
  const result = await supabase.from('employees_positions').select('*').order('id', { ascending: true })
  if(result.error) throw result.error
  return result
}

export const deletePosition = async (id: number) => {
  const response = await supabase.from('employees_positions').delete().eq('id', id).select()
  if(response.error) throw response.error
  retrivePositions()
}

export const createPosition = async (formData: object) => {
  const payload = addFormPayload(formData)
  const response = await supabase.from('employees_positions').insert(payload).select()
  if(response.error) throw response.error
  retrivePositions()
  return response
}

export const updatePosition = async (formData: object) => {
  const payload = updateFormPayload(formData)
  const response = await supabase.from('employees_positions').update(payload).eq('id', formData.id).select()
  if(response.error) throw response.error
  retrivePositions()
  return response
}