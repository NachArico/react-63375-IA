import { useCrypto } from '../../context/CryptoContext'
import CryptoList from './productcontainer/CryptoList'

const Products = ({ CategoryID }) => {
  const { getCryptosByCategory, loading, error } = useCrypto()

  const cryptos = getCryptosByCategory(CategoryID)

  if (error) {
    return (
      <div className="loading-container">
        <p className="error-message">❌ {error}</p>
      </div>
    )
  }

  return (
    <>
      <CryptoList product={cryptos} loading={loading} />
    </>
  )
}

export default Products