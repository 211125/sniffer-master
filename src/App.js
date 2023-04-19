import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "boxicons/css/boxicons.min.css";
import "./styles/styles.css"
import Home from './components/Home'
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import Aceptar from "./pages/Aceptar";
import Table from "./pages/Table";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Aceptar" element={<Aceptar />} />
          <Route path="/sniffer" element={<Table />} />

        </Routes>
      </Router>
    </div>

  );
}

export default App;
