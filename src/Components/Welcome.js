import React, { useEffect, useState } from 'react';

const Welcome = () => {
  const [nomeAluno, setNomeAluno] = useState('');

  useEffect(() => {
    const nome = localStorage.getItem('nomeAluno');
    setNomeAluno(nome || 'Aluno'); // Define um valor padrão se o nome não estiver disponível
  }, []);

  return (
    <div>
      <h1>Bem-vindo, {nomeAluno}!</h1>
    </div>
  );
}

export default Welcome;
