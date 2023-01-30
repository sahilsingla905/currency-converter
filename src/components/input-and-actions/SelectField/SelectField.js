import React from "react";
import { SelectOption } from "./SelectOption";

export const SelectField = ({label, containerClass, className, defaultValue, name, options, handleChange, ...props}) => {
  return (
    <label className={containerClass}>
      {label}
      <select
        name={name}
        value={defaultValue}
        onChange={handleChange}
        className={`h-8 bg-transparent border-b-2 border-silver focus:outline-none ${className}`}
        {...props}
      >
      {
        options.map((option) => {
          return (
            <SelectOption
              key={option.label}
              value={option.value}
              label={option.label}
            />
          )
        })
      }
      </select>
    </label>
  )
}