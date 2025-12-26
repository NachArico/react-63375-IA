import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCrypto } from '../../context/CryptoContext'
import { fetchCryptoDetails } from '../../services/cryptoApi'
import CryptoNews from '../CryptoNews/CryptoNews'

function Detail() {
  const [crypto, setCrypto] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCryptoById, openPurchaseMenu } = useCrypto()

  useEffect(() => {
    const loadCrypto = async () => {
      setLoading(true)

      // Try to get from context first (faster)
      const contextCrypto = getCryptoById(id)

      if (contextCrypto) {
        setCrypto(contextCrypto)
        setLoading(false)
      }

      // Then fetch detailed data from API
      const detailedData = await fetchCryptoDetails(id)
      if (detailedData) {
        setCrypto(detailedData)
      }
      setLoading(false)
    }

    loadCrypto()
  }, [id, getCryptoById])

  const formatPrice = (price) => {
    if (!price) return '$0.00'
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 10 ? 4 : 2,
      maximumFractionDigits: price < 10 ? 4 : 2
    }).format(price)
  }

  const formatLargeNumber = (value) => {
    if (!value) return '-'
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
    return `$${value.toLocaleString()}`
  }

  if (loading && !crypto) {
    return (
      <div className="detailCrypto">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando detalles...</p>
        </div>
      </div>
    )
  }

  if (!crypto) {
    return (
      <div className="detailCrypto">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <div className="loading-container">
          <p>Criptomoneda no encontrada</p>
        </div>
      </div>
    )
  }

  return (
    <div className="detailCrypto">
      <button className="back-button" onClick={() => navigate(-1)}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
        </svg>
        Volver
      </button>

      <div className="detail-layout">
        {/* Main Info Card */}
        <div className="detail-card">
          <img
            src={crypto.imagen}
            alt={`Logo de ${crypto.nombre}`}
          />
          <h2>{crypto.nombre}</h2>
          <span className="symbol">{crypto.symbol}</span>
          <span className={`category-badge ${crypto.categoria}`}>
            {crypto.categoria}
          </span>

          <div className="price-section">
            <p className="price">{formatPrice(crypto.precio)}</p>
            <span className={`price-change ${crypto.cambio24h >= 0 ? 'positive' : 'negative'}`}>
              {crypto.cambio24h >= 0 ? '↑' : '↓'} {Math.abs(crypto.cambio24h || 0).toFixed(2)}% (24h)
            </span>
          </div>

          {/* Description */}
          {crypto.descripcion && (
            <p className="crypto-description">
              {crypto.descripcion.replace(/<[^>]*>/g, '').substring(0, 200)}...
            </p>
          )}

          {/* Market Stats */}
          <div className="market-stats">
            <div className="stat">
              <span className="stat-label">Market Cap</span>
              <span className="stat-value">{formatLargeNumber(crypto.marketCap)}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Volumen 24h</span>
              <span className="stat-value">{formatLargeNumber(crypto.volumen24h)}</span>
            </div>
            {crypto.high24h && (
              <div className="stat">
                <span className="stat-label">Máximo 24h</span>
                <span className="stat-value positive">{formatPrice(crypto.high24h)}</span>
              </div>
            )}
            {crypto.low24h && (
              <div className="stat">
                <span className="stat-label">Mínimo 24h</span>
                <span className="stat-value negative">{formatPrice(crypto.low24h)}</span>
              </div>
            )}
          </div>

          <button className="purchase-btn-detail" onClick={() => openPurchaseMenu(crypto)}>
            <span>💰 Comprar {crypto.symbol}</span>
          </button>
        </div>

        {/* News Section */}
        <div className="detail-sidebar">
          <CryptoNews
            symbol={crypto.symbol}
            coinName={crypto.nombre}
          />
        </div>
      </div>
    </div>
  )
}

export default Detail