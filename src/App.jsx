import NavBar from "./components/NavBar/NavBar"
import Products from "./components/Products/Products"
import Header from "./components/Header/Header"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Inicio from "./components/Inicio"
import "./main.css"
import Detail from "./components/Detail/Detail"

function App() {


  return (
    <BrowserRouter>
     <NavBar />
     <Routes>
      <Route path="/detail/:id" element = {<Detail></Detail>}></Route>
      <Route path="/" element = {<Inicio/>}/>
      <Route path="/Category/:CategoryID" element = {<Inicio/>}/>
      {/* <Route path="/Activos" element = {<Products/>}/> */}
     </Routes>
    </BrowserRouter>

  )
}

export default App
