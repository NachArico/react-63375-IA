import NavBar from "./components/NavBar/NavBar"
import Products from "./components/Products/Products"
import Header from "./components/Header/Header"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Inicio from "./components/Inicio"

function App() {


  return (
    <BrowserRouter>
     <NavBar />
     <div style={{ display: "flex", justifyContent: "center", fontSize: "40px", fontFamily: "fantasy", backgroundColor: "black", color: "antiquewhite", padding: "25px", }}><Header /></div>
     <Routes>
      <Route path="/" element = {<Inicio/>}/>
      <Route path="/Activos" element = {<Products/>}/>
     </Routes>
      {/* <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "black", paddingInline: "100px" }}><Products /></div> */}
    </BrowserRouter>

  )
}

export default App
