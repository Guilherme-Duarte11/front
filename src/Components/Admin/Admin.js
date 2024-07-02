import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import Formulario from '../Formulario/Formulario';

const Admin = () => {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    nome: '',
    matricula: '',
    senha: '',
    tipo: 'aluno'
  });
  const [showProfessores, setShowProfessores] = useState(false);

  useEffect(() => {
    fetchAlunos();
    fetchProfessores();
  }, []);

  const fetchAlunos = () => {
    fetch("http://localhost:8080/aluno/all")
      .then((resp) => resp.json())
      .then((data) => setAlunos(data))
      .catch((err) => console.log(err));
  };

  const fetchProfessores = () => {
    fetch("http://localhost:8080/professor/all")
      .then((resp) => resp.json())
      .then((data) => setProfessores(data))
      .catch((err) => console.log(err));
  };

  const createPost = (data) => {
    const endpoint = data.tipo === 'aluno' ? "aluno/salvar" : "professor/salvar";

    fetch(`http://localhost:8080/${endpoint}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((resp) => {
      if (resp.ok) {
        fetchAlunos();
        fetchProfessores();
        setFormData({
          id: null,
          nome: '',
          matricula: '',
          senha: '',
          tipo: 'aluno'
        });
      } else {
        throw new Error('Erro ao criar o usuário');
      }
    })
    .catch((err) => console.log(err));
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  const handleEditAluno = (aluno) => {
    setFormData({
      id: aluno.id,
      nome: aluno.nome,
      matricula: aluno.matricula,
      senha: '',
      tipo: 'aluno'
    });
  };

  const handleDeleteAluno = (id) => {
    fetch(`http://localhost:8080/aluno/${id}`, {
      method: 'DELETE',
    })
    .then(() => fetchAlunos())
    .catch((err) => console.log(err));
  };

  const handleEditProfessor = (professor) => {
    setFormData({
      id: professor.id,
      nome: professor.nome,
      CPF: professor.CPF,
      senha: '',
      tipo: 'professor'
    });
  };

  const handleDeleteProfessor = (id) => {
    fetch(`http://localhost:8080/professor/${id}`, {
      method: 'DELETE',
    })
    .then(() => fetchProfessores())
    .catch((err) => console.log(err));
  };

  const toggleTables = () => {
    setShowProfessores(!showProfessores);
  };

  return (
    <div className='admin-container'>
      <div className='titles'>
        <h1>Página do Administrador</h1>
        <h1 className='subtitulo'>Adicionar Usuário</h1>
        <Formulario onSubmit={createPost} initialData={formData} />
      </div>
      <button className='button voltar' onClick={handleBackToLogin}>Voltar</button>
      <button className='button toggle-tables' onClick={toggleTables}>
        {showProfessores ? 'Mostrar Alunos' : 'Mostrar Professores'}
      </button>

      {showProfessores ? (
        <div>
          <h2>Lista de Professores</h2>
          <table className='professores-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {professores.map((professor) => (
                <tr key={professor.id}>
                  <td>{professor.id}</td>
                  <td>{professor.nome}</td>
                  <td>{professor.CPF}</td>
                  <td>
                    <button className='button' onClick={() => handleEditProfessor(professor)}>Editar</button>
                    <button className='button' onClick={() => handleDeleteProfessor(professor.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
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
                    <button className='button' onClick={() => handleEditAluno(aluno)}>Editar</button>
                    <button className='button' onClick={() => handleDeleteAluno(aluno.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
