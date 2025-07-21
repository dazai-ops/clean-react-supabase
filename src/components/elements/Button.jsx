function Button({children, type, onClick, className, disabled}) {
  return (
    <button className={className || "badge badge-soft badge-info text-md mb-3"}
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}
    >
      {children || 'Button'}
    </button>
  )
}

export default Button
