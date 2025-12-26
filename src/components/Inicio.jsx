import { Link, useParams } from "react-router-dom"
import Header from './Header/Header'
import Products from './Products/Products'
import { useCrypto } from '../context/CryptoContext'

function Inicio() {
  const { CategoryID } = useParams()
  const { cryptoData, loading, openPurchaseMenu } = useCrypto()

  // Get top 3 cryptos for featured section
  const featuredCryptos = cryptoData
    .filter(c => ['bitcoin', 'ethereum', 'cardano'].includes(c.id))
    .slice(0, 3)

  const formatPrice = (price) => {
    if (!price) return '$0.00'
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 10 ? 2 : 0,
      maximumFractionDigits: price < 10 ? 2 : 0
    }).format(price)
  }

  return (
    <div>
      {!CategoryID && (
        <div>
          <Header />

          <div className='cardMenu'>
            {loading ? (
              // Loading skeletons
              [1, 2, 3].map(i => (
                <div className='containerCard' key={i}>
                  <div className="card skeleton-card">
                    <div className="skeleton" style={{ width: 64, height: 64, borderRadius: '50%' }}></div>
                    <div className="skeleton" style={{ width: 100, height: 20 }}></div>
                    <div className="skeleton" style={{ width: 80, height: 24 }}></div>
                  </div>
                </div>
              ))
            ) : (
              featuredCryptos.map((crypto, index) => (
                <div className='containerCard' key={crypto.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="card">
                    <img
                      src={crypto.imagen}
                      alt={`Logo de ${crypto.nombre}`}
                      width="64"
                    />
                    <p className="title">{crypto.nombre}</p>
                    <p className="price">{formatPrice(crypto.precio)}</p>
                    <div className="price-change-row">
                      <span className={`price-change ${crypto.cambio24h >= 0 ? 'positive' : 'negative'}`}>
                        {crypto.cambio24h >= 0 ? '↑' : '↓'} {Math.abs(crypto.cambio24h || 0).toFixed(2)}%
                      </span>
                    </div>
                    <span className={`category-badge ${crypto.categoria}`}>
                      {crypto.categoria}
                    </span>
                  </div>
                  <div className="card-actions">
                    <Link to={`/detail/${crypto.id}`}>
                      <button className="btn-secondary">
                        <span>Ver detalles</span>
                      </button>
                    </Link>
                    <button onClick={() => openPurchaseMenu(crypto)}>
                      <span>Comprar</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {CategoryID && (
        <div>
          <Products CategoryID={CategoryID} />
        </div>
      )}
    </div>
  )
}

export default Inicio