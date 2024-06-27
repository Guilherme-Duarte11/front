import './App.css';
import Login from './Components/Login/Login';
import Admin from './Components/Admin/Admin'; // Certifique-se de criar este componente
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;
