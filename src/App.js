import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";

import "boxicons/css/boxicons.min.css";
import "./styles/styles.css"
import Home from './components/Home'
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import NotFound from "./pages/Error404";
import Table from "./pages/Table";
import SignUpMaster from "./pages/SignUpMaster";

function App() {

 
  return (
    <div>
    
      <Router>
        <Routes>

          <Route path="/"  element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />

          <Route path="/Home" element={<Home />} />
          <Route path="/SignUpMaster" element={<SignUpMaster />} />
          <Route path="/sniffer" element={<Table />} />
          <Route  path="*" element={<NotFound />} />

        </Routes>
      </Router>
     
    </div>

  );
}

export default App;
