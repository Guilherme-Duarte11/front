import React from 'react';
import './Gravar.css';

const Gravar = ({ text, onClick }) => {
  return (
    <button className="gravar-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Gravar;
