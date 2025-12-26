import { Link } from 'react-router-dom'
import { useCrypto } from '../../../context/CryptoContext'

function CryptoItem({ item }) {
  const { openPurchaseMenu } = useCrypto()

  const formatPrice = (price) => {
    if (!price) return '$0.00'
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 10 ? 4 : 2,
      maximumFractionDigits: price < 10 ? 4 : 2
    }).format(price)
  }

  const formatMarketCap = (value) => {
    if (!value) return '-'
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
    return `$${value.toLocaleString()}`
  }

  return (
    <div className="containerCard">
      <div className="card">
        <img
          src={item.imagen}
          alt={`Logo de ${item.nombre}`}
          width="64"
        />
        <h2>{item.nombre}</h2>
        <span className="symbol">{item.symbol}</span>
        <p className="price">{formatPrice(item.precio)}</p>
        <div className="price-change-row">
          <span className={`price-change ${item.cambio24h >= 0 ? 'positive' : 'negative'}`}>
            {item.cambio24h >= 0 ? '↑' : '↓'} {Math.abs(item.cambio24h || 0).toFixed(2)}%
          </span>
        </div>
        {item.marketCap && (
          <span className="market-cap">Cap: {formatMarketCap(item.marketCap)}</span>
        )}
        <span className={`category-badge ${item.categoria}`}>
          {item.categoria}
        </span>
      </div>
      <div className="card-actions">
        <Link to={`/detail/${item.id}`}>
          <button className="btn-secondary">
            <span>Ver detalles</span>
          </button>
        </Link>
        <button onClick={() => openPurchaseMenu(item)}>
          <span>Comprar</span>
        </button>
      </div>
    </div>
  )
}

export default CryptoItem