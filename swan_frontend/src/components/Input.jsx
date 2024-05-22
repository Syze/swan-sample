import React from "react";

const Input = ({ type = "text", placeholder = "", accept = "", onChange, label = "", name = "", multiple = false }) => {
  return (
    <label>
      {label}
      <input type={type} placeholder={placeholder} accept={accept} onChange={onChange && onChange} name={name} multiple={multiple} />
    </label>
  );
};

export default Input;
