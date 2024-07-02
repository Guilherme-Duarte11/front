import React from 'react';
import './Select.css';

const Select = ({ name, text, options, value, onChange }) => {
  return (
    <div className="select-container">
      <label htmlFor={name}>{text}</label>
      <select id={name} name={name} value={value} onChange={onChange}>
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
