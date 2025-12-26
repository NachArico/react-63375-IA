import CryptoItem from './CryptoItem'

function CryptoList({ product, loading }) {
  if (loading) {
    return (
      <div className="containerCryptos">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="containerCard">
            <div className="card skeleton-card">
              <div className="skeleton" style={{ width: 64, height: 64, borderRadius: '50%' }}></div>
              <div className="skeleton" style={{ width: 100, height: 20 }}></div>
              <div className="skeleton" style={{ width: 80, height: 24 }}></div>
              <div className="skeleton" style={{ width: 60, height: 16 }}></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!product || product.length === 0) {
    return (
      <div className="loading-container">
        <p>No hay criptomonedas disponibles en esta categoría</p>
      </div>
    )
  }

  return (
    <div className="containerCryptos">
      {product.map((prod, index) => (
        <div
          key={prod.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CryptoItem item={prod} />
        </div>
      ))}
    </div>
  )
}

export default CryptoList