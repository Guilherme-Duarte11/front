import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleEntry = (matricula, senha) => {
    fetch("http://localhost:8080/aluno/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matricula, senha }) // Envia a matricula e a senha para o backend
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Login falhou');
        }
        return resp.json();
      })
      .then((data) => {
        if (data && data.id !== null) {
          navigate('/welcome'); // Redireciona para a página de boas-vindas
        } else {
          alert('Credenciais inválidas');
        }
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEntry(matricula, senha);
  };

  const handleAdminLogin = () => {
    navigate('/admin');
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h1>Acesse o sistema</h1>
        <div className="input-field">
          <input
            type="number"
            placeholder='Informe seu CPF ou sua Matrícula'
            onChange={(e) => setMatricula(e.target.value)}
            value={matricula}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder='Senha'
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
          />
          <FaLock className="icon" />
        </div>
        <div className="recall-forget">
          <label>
            <input type="checkbox" />
            Lembre de mim
          </label>
          <a href="#">Esqueceu a senha?</a>
        </div>
        <div className="botoes">
          <button type="submit">Entrar</button> {/* Botão com type="submit" */}
        </div>
        <div className="ADM">
          <button type="button" onClick={handleAdminLogin}>Administrador</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
