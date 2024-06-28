import './App.css';
import Login from './Components/Login/Login';
import Admin from './Components/Admin/Admin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Components/Welcome'; // Certifique-se de criar e importar o componente Welcome

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/welcome" element={<Welcome />} /> {/* Adicione esta linha */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
