import React from "react";

export const SelectOption = ({ label, value }) => {
  return (
    <option data-testid="select-option" value={value}>
      {label}
    </option>
  );
}