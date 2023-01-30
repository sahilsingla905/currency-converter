import React from 'react';

export const InputField = ({label, containerClass, className, value, handleValueChange, type, name, ...props}) => {
  return (
    <label className={containerClass}>
      {label}
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleValueChange}
        className={`h-8 !bg-transparent border-b-2 border-silver focus:outline-none ${className}`}
        {...props}
      />
    </label>
  )
}
