import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import Formulario from '../Formulario/Formulario';

const Admin = () => {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    nome: '',
    identificacao: '',
    senha: '',
    category_id: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/Alunos", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Alunos carregados:', data); // Log para verificar os dados carregados
        setAlunos(data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Categorias carregadas:', data); // Log para verificar os dados carregados
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const createPost = (alunoData) => {
    fetch("http://localhost:5000/Alunos", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(alunoData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Aluno criado:', data); // Log para verificar o aluno criado
        setAlunos([...alunos, data]);
        setFormData({
          id: null,
          nome: '',
          identificacao: '',
          senha: '',
          category_id: '',
        });
      })
      .catch(err => console.log(err));
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  const handleDelete = (id) => {
    console.log('Deletando aluno com id:', id); 
    fetch(`http://localhost:5000/Alunos/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        if (resp.ok) {
          console.log(`Aluno com id ${id} deletado com sucesso`); // Log para verificar se a exclusão foi bem-sucedida
          setAlunos(alunos.filter(aluno => aluno.id !== id));
        } else {
          console.log('Erro ao deletar o aluno'); // Log para verificar erro na exclusão
          throw new Error('Erro ao deletar o aluno');
        }
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (aluno) => {
    console.log('Editando aluno:', aluno); // Log para verificar o aluno a ser editado
    setFormData({
      id: aluno.id,
      nome: aluno.nome,
      identificacao: aluno.identificacao,
      senha: '', // Limpar senha ao editar ou manter conforme necessário
      category_id: aluno.category_id,
    });
  };

  const handleUpdate = () => {
    console.log('Atualizando aluno com dados:', formData); // Log para verificar os dados a serem atualizados
    fetch(`http://localhost:5000/Alunos/${formData.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Resposta do servidor ao atualizar:', data); // Log para verificar a resposta do servidor
        setAlunos(alunos.map(aluno => (aluno.id === data.id ? data : aluno)));
        setFormData({
          id: null,
          nome: '',
          identificacao: '',
          senha: '',
          category_id: '',
        });
      })
      .catch(err => console.log(err));
  };

  const getCategoryName = (categoryId) => {
    if (categoryId === '1') return 'Aluno';
    if (categoryId === '2') return 'Professor';
    return 'Categoria Desconhecida';
  };

  return (
    <header>
      <div className='admin-container'>
        <div className='titles'>
          <h1>Página do Administrador</h1>
          <h1 className='subtitulo'>Adicionar Usuário</h1>
          <Formulario
            onSubmit={formData.id ? handleUpdate : createPost}
            initialData={formData}
          />
        </div>
        <button className='voltar' onClick={handleBackToLogin}>Voltar</button>

        <h2>Lista de Alunos</h2>
        <table className='alunos-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Identificador</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id} style={{ backgroundColor: 'white' }}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.identificacao}</td>
                <td>{getCategoryName(aluno.category_id)}</td>
                <td>
                  <button onClick={() => handleEdit(aluno)}>Editar</button>
                  <button onClick={() => handleDelete(aluno.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </header>
  );
};

export default Admin;
