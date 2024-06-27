import React, { useEffect, useState } from 'react';
import styles from './Formulario.css'; // Mantendo o CSS original
import Input from '../Input/Input';
import Select from '../Select/Select';
import Gravar from '../Submit/Gravar';

const Formulario = ({ onSubmit, initialData }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    nome: '',
    identificacao: '',
    senha: '',
    category_id: '',
    ...initialData, // Preencher os dados iniciais se existirem
  });

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));

    // Resetar o formulário quando initialData mudar (pode não ser necessário em todos os casos)
    setFormData({
      id: initialData?.id || null,
      nome: initialData?.nome || '',
      identificacao: initialData?.identificacao || '',
      senha: '', // Limpar o campo de senha ou manter conforme necessário
      category_id: initialData?.category_id || '',
    });
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      id: null,
      nome: '',
      identificacao: '',
      senha: '',
      category_id: '',
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type="text"
        text="Nome: "
        name="nome"
        placeholder="Insira o nome do Usuário"
        value={formData.nome}
        onChange={handleChange}
      />
      <Input
        type="text"
        text="Identificador: "
        name="identificacao"
        placeholder="Insira o CPF ou a Matrícula"
        value={formData.identificacao}
        onChange={handleChange}
      />
      <Input
        type="password"
        text="Senha: "
        name="senha"
        placeholder="Crie a senha do Usuário"
        value={formData.senha}
        onChange={handleChange}
      />
      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        value={formData.category_id}
        onChange={handleChange}
      />
      <Gravar text={formData.id ? "Atualizar" : "Cadastrar"} />
    </form>
  );
};

export default Formulario;
