import { Link } from "react-router-dom"
import CardWidget from "../CardWidget/CardWidget"

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="menu">
        <li><Link to="/">BatCaveCrpyto</Link></li>
        {/* <li><Link to="/Category/Exchange">Exchange</Link></li> */}
        <li><Link to="/Category/cryptos">Cryptos</Link></li>
        <li><Link to="/Category/stable">Stable</Link></li>
        <li><Link to="/Category/volatil">Volátil</Link></li>
      </ul>
      <CardWidget />
    </nav>


  )
}

export default NavBar