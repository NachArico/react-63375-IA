import { Link } from "react-router-dom"
import CardWidget from "../CardWidget/CardWidget"
import "./NavBar.css"

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">BatCaveCrpyto</Link></li>
        <li><Link to="Tiendas">Tiendas y cajeros</Link></li>
        <li><Link to="Franquicias">Franquicias</Link></li>
        <li><Link to="Exchange">Exchange</Link></li>
        <li><Link to="Token">BCC Token</Link></li>
        <li><Link to="Activos">Activos</Link></li>
      </ul>
      <CardWidget />
    </nav>


  )
}

export default NavBar