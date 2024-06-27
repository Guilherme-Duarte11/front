import React from 'react';
import './Select.css'; // Mantendo o CSS original

const Select = ({ name, text, options, value, onChange }) => {
  return (
    <div className="select-container">
      <label htmlFor={name}>{text}</label>
      <select id={name} name={name} value={value} onChange={onChange}>
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
