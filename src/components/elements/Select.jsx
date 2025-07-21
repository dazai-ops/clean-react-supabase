import React from 'react'

function Select({id, name, onChange, disabled, items, itemKey, itemName, value }) {
  return (
    <select
      id={id}
      name={name}
      className="select w-full"
      onChange={onChange}
      disabled={disabled || false}
      value={value}
    >
      <option value="">
        Choose One
      </option>
      {items.map(item => (
        <option key={item[itemKey]} value={item[itemKey]}>
          {item[itemName]}
        </option>
      ))}
    </select>
  )
}

export default Select
