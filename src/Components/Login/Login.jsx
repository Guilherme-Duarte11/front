import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("enviando os dados: " + username + "-" + password);
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
          onChange={(e) => setUsername(e.target.value)} />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input type="password" placeholder='Senha' 
          onChange={(e) => setPassword(e.target.value)} />
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
          <button type="submit">Aluno</button>
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
