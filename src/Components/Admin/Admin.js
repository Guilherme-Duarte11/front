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
    matricula: '',
    senha: '',
  });

  const fetchAlunos = () => {
    fetch("http://localhost:8080/aluno/all", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const filteredAlunos = data
          .filter(aluno => aluno.id !== null) // Remove alunos com ID null
          .sort((a, b) => a.id - b.id); // Ordena os alunos por ID
        setAlunos(filteredAlunos);
      })
      .catch(err => console.log(err));
  };

  const createPost = (alunoData) => {
    const newId = alunos.length > 0 ? Math.max(...alunos.map(aluno => aluno.id)) + 1 : 1;
    const newAluno = { ...alunoData, id: newId };
    fetch("http://localhost:8080/aluno", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAluno),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setAlunos([...alunos, newAluno]);
        setFormData({
          id: null,
          nome: '',
          matricula: '',
          senha: '',
        });
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/aluno/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        if (resp.ok) {
          setAlunos(alunos.filter(aluno => aluno.id !== id));
        } else {
          throw new Error('Erro ao deletar o aluno');
        }
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (aluno) => {
    setFormData({
      id: aluno.id,
      nome: aluno.nome,
      matricula: aluno.matricula,
      senha: '', // Limpar senha ao editar ou manter conforme necessário
    });
  };

  const handleUpdate = () => {
    const updatedAluno = { ...formData };
    if (!updatedAluno.senha) {
      delete updatedAluno.senha; // Remove senha se estiver vazia
    }

    fetch(`http://localhost:8080/aluno/${formData.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAluno),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error('Erro ao atualizar o aluno');
      })
      .then((data) => {
        const updatedAlunos = alunos.map(aluno => (aluno.id === formData.id ? data : aluno));
        setAlunos(updatedAlunos);
        setFormData({
          id: null,
          nome: '',
          matricula: '',
          senha: '',
        });
      })
      .catch(err => console.log(err));
  };

  const handleBackToLogin = () => {
    navigate('/');
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
        <button className='button voltar' onClick={handleBackToLogin}>Voltar</button>
        <button className='button fetch-alunos' onClick={fetchAlunos}>Mostrar Alunos</button>

        {alunos.length > 0 && (
          <div>
            <h2>Lista de Alunos</h2>
            <table className='alunos-table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Matrícula</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((aluno) => (
                  <tr key={aluno.id}>
                    <td>{aluno.id}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.matricula}</td>
                    <td>
                      <button className='button' onClick={() => handleEdit(aluno)}>Editar</button>
                      <button className='button' onClick={() => handleDelete(aluno.id)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </header>
  );
};

export default Admin;
