import { useState } from 'react'
import { retriveEmployees, deleteEmployee, createEmployee, updateEmployee } from '../service/api/employee/employeeService';

interface Employee {
  id: number
  name: string
  age: number
  employee_position_id: number
}

export const useEmployee = () => {

  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadEmployee = async () => {
    try {
      const result = await retriveEmployees()
      setEmployees([...result.data])
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const removeEmployee = async (id: number) => {
    try {
      await deleteEmployee(id)
      await loadEmployee()
    } catch (error) {
      setError(error.message)
    }
  }

  const addEmployee = async (payload: object) => {
    try {
      const result = await createEmployee(payload)
      await loadEmployee()
      return result
    } catch (error) {
      setError(error.message)
    }
  }

  const changeEmployee = async (payload: object) => {
    try {
      const result = await updateEmployee(payload)
      await loadEmployee()
      return result
    } catch (error) {
      setError(error.message)
    }
  }

  return { employees, isLoading, error, removeEmployee, loadEmployee, addEmployee, changeEmployee }
}