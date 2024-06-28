import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { SiOpenhab } from "react-icons/si";

const Login = () => {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    alert("enviando os dados: " + matricula + "-" + senha);
  }


  const handleEntry = (matricula, senha) =>{
    fetch("http://localhost:8080/aluno/login", {
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
  }

  const handleAdminLogin = () => {
    navigate('/admin');
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}> 
        <h1>Acesse o sistema</h1>
        <div className="input-field">
          <input type="number" placeholder='Informe seu CPF ou sua Matrícula'
          onChange={(e) => setMatricula(e.target.value)} />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input type="password" placeholder='Senha' 
          onChange={(e) => setSenha(e.target.value)} />
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
          <button type="submit" onClick={() => handleEntry(matricula,senha)}>Aluno</button>
          <button type="submit">Professor</button>

        </div>
        <div className="ADM">
          <button type="button" onClick={handleAdminLogin}>Administrador</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
