import { useState } from 'react'
import TableEmployees from '../../components/table/employee/TableEmployees'
import ModalCreate from '../modal/employee/ModalCreate'
import ModalEdit from '../modal/employee/ModalEdit'
import Button from '../elements/Button'
import AlertEmpty from '../elements/AlertEmpty'

function RenderEmployee({
  isLoading,
  errorMessage,
  employees,
  positions,
  addEmployee,
  changeEmployee,
  removeEmployee
}) {

  const [isOpen, setIsOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const handleEdit = (employee) => setSelectedEmployee(employee)
  const handleCloseModal = () => setSelectedEmployee(null)

  return (
    <div className='w-full flex flex-col max-w-2xl'>
      <div className='flex justify-between'>
        <span className="badge badge-soft badge-info text-md mb-3">Employee</span>
        <Button onClick={() => setIsOpen(true)}>Add Employee</Button>
      </div>
      
      <ModalCreate 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        positions={positions}
        addEmployee={addEmployee}
      />

      <ModalEdit
        isOpen={!!selectedEmployee}
        onClose={handleCloseModal}
        positions={positions}
        selectedEmployee={selectedEmployee}
        changeEmployee={changeEmployee}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : employees.length > 0 ?(
        <TableEmployees 
          employees={employees}
          positions={positions}
          removeEmployee={removeEmployee}
          onEdit={handleEdit}
        />
        
      ) : (
        <AlertEmpty>
          No employee found
        </AlertEmpty>
      )}
    </div>
  )
}

export default RenderEmployee