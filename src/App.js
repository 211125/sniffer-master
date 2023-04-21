import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";

import "boxicons/css/boxicons.min.css";
import "./styles/styles.css"
import Home from './components/Home'
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import Aceptar from "./pages/Aceptar";
import Table from "./pages/Table";
import { UserProvider } from "./pages/UserProvider";
import SignUpMaster from "./pages/SignUpMaster";

function App() {

 
  return (
    <div>
       <UserProvider>
      <Router>
        <Routes>

          <Route path="/"  element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />

          <Route path="/Home" element={<Home />} />
          <Route path="/SignUpMaster" element={<SignUpMaster />} />
          <Route path="/sniffer" element={<Table />} />

        </Routes>
      </Router>
      </UserProvider>
    </div>

  );
}

export default App;
