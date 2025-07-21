import { useEffect, useState } from 'react'
import { useModal } from '../../../hooks/useModal'
import Label from '../../elements/Label'
import Input from '../../elements/Input'
import Select from '../../elements/Select'
import Button from '../../elements/Button'

function ModalEdit({ isOpen, onClose, positions, reloadEmployees, selectedEmployee, changeEmployee}) {

  const {dialogRef, handleOverlayClick} = useModal(isOpen, onClose)
  
  const [formData, setFormData] = useState({id: null,name: '', age: '', position_id: ''})
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if(isOpen && selectedEmployee){
      setFormData({
        id: selectedEmployee.id,
        name: selectedEmployee.name ?? '',
        age: selectedEmployee.age ?? '',
        position_id: selectedEmployee.employee_position_id ?? ''
      })
      setMessage(null)
    }
  }, [isOpen, selectedEmployee])

  if(!isOpen) return null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, position_id: value }))
  }

  const isChanged = () => {
    return !(
      formData.name === (selectedEmployee.name ?? '') &&
      String(formData.age) === String(selectedEmployee.age ?? '') &&
      String(formData.position_id) === String(selectedEmployee.employee_position_id ?? '')
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)

    if (!formData.name.trim()) return setMessage('Name should not be empty.')
    if (formData.age === '' || formData.age === null) return setMessage('Age should not be empty.')
    if (!formData.position_id) return setMessage('Position should not be empty.')
    
    if (!isChanged()) {
      setMessage('No changes made.')
      return
    }

    setSubmitting(true)
    try {
      const result = await changeEmployee(formData)
      if (result.error) throw result.error
      setMessage('Employee updated.')
      await reloadEmployees?.()
      onClose()
    } catch (err) {
      setMessage(err.message || 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-employee-title"
      onMouseDown={handleOverlayClick}
    >
      <div
        ref={dialogRef}
        className="z-50 w-10/12 md:w-96 bg-base-100 rounded-lg shadow-lg max-w-xl p-5 relative"
      >
        <h3 id="edit-employee-title" className="text-lg font-semibold mb-4">
          Edit Employee
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={submitting}
            />
          </div>

          <div>
            <Label htmlFor="age">Age (Years)</Label>
            <Input
              name="age"
              id="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange}
              disabled={submitting}
            />
          </div>

            <div>
            <Label htmlFor="position">Position</Label>
            <Select 
              id="position"
              name="position"
              value={formData.position_id}
              onChange={(e) => handleSelectChange(e.target.value)}
              disabled={submitting}
              items={positions}
              itemKey="id"
              itemName="position_name"
            />
          </div>

          {message && (
            <p className="text-sm mt-1 italic text-info">
              {message}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              className="btn btn-soft btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Close
            </Button>
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalEdit
