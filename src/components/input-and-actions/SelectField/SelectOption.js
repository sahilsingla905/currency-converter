import React from "react";

export const SelectOption = ({ label, value }) => {
  return (
    <option value={value}>
      {label}
    </option>
  );
}