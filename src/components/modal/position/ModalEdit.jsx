import { useEffect, useState } from 'react'
import { useModal } from '../../../hooks/useModal'
import Label from '../../elements/Label'
import Input from '../../elements/Input'
import Select from '../../elements/Select'
import Button from '../../elements/Button'

function ModalEdit({ isOpen, onClose, reloadPositions, selectedPosition, changePosition}) {

  const {dialogRef, handleOverlayClick} = useModal(isOpen, onClose)
  const [formData, setFormData] = useState({id: null, position_name: ''})
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if(isOpen && selectedPosition){
      setFormData({
        id: selectedPosition.id,
        position_name: selectedPosition.position_name ?? '',
      })
      setMessage(null)
    }
  }, [isOpen, selectedPosition])

  if(!isOpen) return null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const isChanged = () => {
    return !(
      formData.position_name === (selectedPosition.position_name ?? '')
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)

    if (!formData.position_name.trim()) return setMessage('Name should not be empty.')
    
    if (!isChanged()) {
      setMessage('No changes made.')
      return
    }

    setSubmitting(true)
    try {
      const result = await changePosition(formData)
      if (result.error) throw result.error
      setMessage('Position updated.')
      await reloadPositions?.()
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
      aria-labelledby="edit-position-title"
      onMouseDown={handleOverlayClick}
    >
      <div
        ref={dialogRef}
        className="z-50 w-10/12 md:w-96 bg-base-100 rounded-lg shadow-lg max-w-xl p-5 relative"
      >
        <h3 id="edit-position-title" className="text-lg font-semibold mb-4">
          Edit Position
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              name="position_name"
              id="name"
              value={formData.position_name}
              onChange={handleInputChange}
              disabled={submitting}
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
