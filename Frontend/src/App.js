import './App.css';
import Content from './components/Content.js';
import Login from './components/Login.js';
import Registrierung from './components/registrierung.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route für die Registrierungsseite */}
          <Route path="/registrierung" element={<Registrierung />} />
          {/* Route für die Login-Seite */}
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Content date={null} />} />
          <Route path="/completed" element={<Content date={null} />} />
          <Route path="/Today" element={<Content date={new Date()} />} />
          <Route path="/Tomorrow" element={<Content date={new Date(new Date().getTime() + (24 * 60 * 60 * 1000))} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

