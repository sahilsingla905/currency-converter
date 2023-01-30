import React from "react";

export const Button = ({ type, children, className, ...props }) => {
  return (
    <button type={type} className={`h-8 px-2 uppercase rounded-sm ${className}`} {...props}>
      {children}
    </button>
  );
}