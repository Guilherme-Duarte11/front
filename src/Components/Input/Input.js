import React from 'react';
import './Input.css'; // Mantendo o CSS original

const Input = ({ type, text, name, placeholder, value, onChange }) => {
  return (
    <div className="input-container">
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
