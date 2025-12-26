import NavBar from "./components/NavBar/NavBar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Inicio from "./components/Inicio"
import "./main.css"
import Detail from "./components/Detail/Detail"
import { CryptoProvider } from "./context/CryptoContext"
import PurchaseMenu from "./components/PurchaseMenu/PurchaseMenu"

function App() {
  return (
    <CryptoProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/Category/:CategoryID" element={<Inicio />} />
        </Routes>
        <PurchaseMenu />
      </BrowserRouter>
    </CryptoProvider>
  )
}

export default App
