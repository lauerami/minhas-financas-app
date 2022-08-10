import React from "react";

import { BrowserRouter, Routes, Route} from "react-router-dom";

import "toastr/build/toastr.min.js"

import "bootswatch/dist/flatly/bootstrap.css"
import "../custom.css"
import "toastr/build/toastr.css"

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import ProvedorAutenticacao from "./provedorAutenticacao"  

import Login from "../views/login"
import CadastroUsuario from "../views/cadastroUsuario"
import Home from "../views/home"
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import Navbar from "../components/navbar"
import LandingPage from "../views/landingpage";

import { RequireAuth } from "./requiredAuth";


function App() {

  return(
    <BrowserRouter>
      <ProvedorAutenticacao>
        <Navbar />
        <div className="container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro-usuarios" element={<CadastroUsuario />} />

              <Route path="/home" element={ <RequireAuth> <Home /> </RequireAuth> } />
              <Route path="/consulta-lancamentos" element={<RequireAuth> <ConsultaLancamentos /> </RequireAuth>} />
              <Route path="/cadastro-lancamentos" element={<RequireAuth> <CadastroLancamentos /> </RequireAuth>} />
              <Route path="/cadastro-lancamentos/:id" element={<RequireAuth> <CadastroLancamentos /> </RequireAuth>} />
            </Routes>
        </div>
      </ProvedorAutenticacao>
    </BrowserRouter>
  )

}

export default App