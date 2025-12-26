import { Link, useLocation } from "react-router-dom"
import { useCrypto } from "../../context/CryptoContext"

function NavBar() {
  const location = useLocation()
  const { openPurchaseMenu, lastUpdated } = useCrypto()

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.toLowerCase().includes(path.toLowerCase())
  }

  const formatLastUpdate = () => {
    if (!lastUpdated) return ''
    return lastUpdated.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
        BatCaveCrypto
      </Link>

      <ul className="menu">
        <li>
          <Link to="/" className={isActive('/') && location.pathname === '/' ? 'active' : ''}>
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/Category/cryptos" className={isActive('/Category/cryptos') ? 'active' : ''}>
            Cryptos
          </Link>
        </li>
        <li>
          <Link to="/Category/stable" className={isActive('/Category/stable') ? 'active' : ''}>
            Stable
          </Link>
        </li>
        <li>
          <Link to="/Category/volatil" className={isActive('/Category/volatil') ? 'active' : ''}>
            Volátil
          </Link>
        </li>
      </ul>

      <div className="navbar-actions">
        {lastUpdated && (
          <span className="last-update">
            {formatLastUpdate()}
          </span>
        )}
        <button className="buy-button" onClick={() => openPurchaseMenu()}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
          </svg>
          Comprar
        </button>
      </div>
    </nav>
  )
}

export default NavBar