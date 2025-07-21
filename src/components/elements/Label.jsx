import React from 'react'

function Label({children, htmlFor}) {
  return (
    <label 
      className="label-text block mb-1" 
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}

export default Label
