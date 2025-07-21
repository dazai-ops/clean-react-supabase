import { useState } from 'react'
import { retrivePositions, deletePosition, createPosition, updatePosition } from '../service/api/position/positionService';

interface Position {
  id: number
  position_name: string
}

export const usePosition = () => {
  const [positions, setPositions] = useState<Position[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadPositions = async () => {
    try {
      const result = await retrivePositions()
      setPositions(result.data)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const removePosition = async (id: number) => {
    try {
      await deletePosition(id)
      await loadPositions()
    } catch (error) {
      setError(error.message)
    }
  }

  const addPosition = async (payload: object) => {
    try {
      const result = await createPosition(payload)
      await loadPositions()
      return result
    } catch (error) {
      setError(error.message)
    }
  }

  const changePosition = async (payload: object) => {
    try {
      const result = await updatePosition(payload)
      await loadPositions()
      return result
    } catch (error) {
      setError(error.message)
    }
  }

  return { positions, isLoading, error, removePosition, loadPositions, addPosition, changePosition }
}