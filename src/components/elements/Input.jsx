function Input({name, id, type, onChange, disabled, value}) {
  return (
    <input
      name={name}
      id={id}
      type={type || 'text'}
      className="input w-full"
      onChange={onChange}
      disabled={disabled}
      value={value }
    />
  )
}

export default Input
