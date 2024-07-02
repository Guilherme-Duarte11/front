import React, { useEffect, useState } from 'react';
import styles from './Formulario.css';
import Input from '../Input/Input';
import Select from '../Select/Select';
import Gravar from '../Submit/Gravar';

const Formulario = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    id: null,
    nome: '',
    identificador: '', 
    senha: '',
    tipo: 'aluno',
    ...initialData,
  });

  useEffect(() => {
    setFormData({
      ...initialData,
      senha: ''
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    
    if (name === 'tipo') {
      const identificadorName = value === 'aluno' ? 'matricula' : 'cpf';
      setFormData({
        ...formData,
        tipo: value,
        identificador: '',
        [identificadorName]: '',
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Select
        text="Tipo de Usuário: "
        name="tipo"
        options={[
          { value: 'aluno', text: 'Aluno' },
          { value: 'professor', text: 'Professor' }
        ]}
        value={formData.tipo}
        onChange={handleChange}
      />
      <Input
        type="text"
        text="Nome: "
        name="nome"
        placeholder="Insira o nome do Usuário"
        value={formData.nome}
        onChange={handleChange}
      />
      {formData.tipo === 'aluno' && (
        <Input
          type="text"
          text="Matrícula: "
          name="matricula"
          placeholder="Insira a matrícula do Aluno"
          value={formData.matricula}
          onChange={handleChange}
        />
      )}
      {formData.tipo === 'professor' && (
        <Input
          type="text"
          text="CPF: "
          name="cpf"
          placeholder="Insira o CPF do Professor"
          value={formData.cpf}
          onChange={handleChange}
        />
      )}
      <Input
        type="password"
        text="Senha: "
        name="senha"
        placeholder="Crie a senha do Usuário"
        value={formData.senha}
        onChange={handleChange}
      />
      <Gravar text={formData.id ? "Atualizar" : "Cadastrar"} />
    </form>
  );
};

export default Formulario;
