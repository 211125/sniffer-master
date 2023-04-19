import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import "boxicons/css/boxicons.min.css";
import "./styles/styles.css"
import Home from './components/Home'
import Login from './pages/Login';
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
