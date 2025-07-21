import { useEffect } from 'react'
import { useEmployee } from '../../hooks/useEmployee'
import { usePosition } from '../../hooks/usePosition'
import RenderEmployee from '../fragments/RenderEmployee'
import RenderPosition from '../fragments/RenderPosition'

function HomeLayout() {

  const {
    employees, 
    isLoading: isEmployeeLoading, 
    error: errorMessageEmployee, 
    loadEmployee,
    addEmployee,
    changeEmployee,
    removeEmployee
  } = useEmployee()

  const {
    positions,
    isLoading: isPositionLoading,
    error: errorMessagePosition,
    loadPositions,
    addPosition,
    changePosition,
    removePosition,
  } = usePosition()

  useEffect(() => {
    loadPositions()
    loadEmployee()
  }, [])

  return (
    <div className='p-3 flex flex-col items-center'>
      
      <RenderEmployee
        employees={employees}
        positions={positions}
        isLoading={isEmployeeLoading}
        errorMessage={errorMessageEmployee}
        addEmployee={addEmployee}
        changeEmployee={changeEmployee}
        removeEmployee={removeEmployee}
      />

      <hr className='my-4'/>

      <RenderPosition
        employees={employees}
        positions={positions}
        isLoading={isPositionLoading}
        errorMessage={errorMessagePosition}
        addPosition={addPosition}
        changePosition={changePosition}
        removePosition={removePosition}
      />

    </div>
    
  )
}

export default HomeLayout
