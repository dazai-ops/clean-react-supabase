import { useState } from 'react'
import TablePositions from '../../components/table/position/TablePositions'
import Button from '../elements/Button'
import ModalCreate from '../modal/position/ModalCreate'
import ModalEdit from '../modal/position/ModalEdit'
import AlertEmpty from '../elements/AlertEmpty'

function RenderPosition({
  positions,
  employees,
  isLoading,
  errorMessage,
  addPosition,
  changePosition,
  removePosition
}) {

  const [isOpen, setIsOpen] = useState(false)
  const [selectedPosition, setSelectedEmployee] = useState(null)

  const handleEdit = (position) => setSelectedEmployee(position)
  const handleCloseModal = () => setSelectedEmployee(null)

  return (
    <div className='w-full flex flex-col max-w-2xl'>
      <div className='w-full flex justify-between'>
        <span className="badge badge-soft badge-info text-md mb-3">Position</span>
        <Button onClick={() => setIsOpen(true)}>Add Position</Button>
      </div>
      
      <ModalCreate
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        addPosition={addPosition}
      />

      <ModalEdit
        isOpen={!!selectedPosition}
        onClose={handleCloseModal}
        selectedPosition={selectedPosition}
        changePosition={changePosition}
      />

      <ul className='flex flex-col gap-3'>
        {isLoading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : positions.length > 0 ? (
          <TablePositions 
            positions={positions} 
            employees={employees} 
            removePosition={removePosition}
            onEdit={handleEdit}
          />
        ) : (
          <AlertEmpty>
            No position found
          </AlertEmpty>
        )}
      </ul>
    </div>
  )
}

export default RenderPosition
