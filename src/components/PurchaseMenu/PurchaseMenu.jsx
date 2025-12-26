import React, { useState } from 'react'
import { useCrypto } from '../../context/CryptoContext'

const PurchaseMenu = () => {
    const {
        cryptoData,
        isPurchaseMenuOpen,
        selectedCryptoForPurchase,
        closePurchaseMenu
    } = useCrypto()

    const [selectedCrypto, setSelectedCrypto] = useState(selectedCryptoForPurchase?.id || '')
    const [amount, setAmount] = useState('')
    const [purchaseType, setPurchaseType] = useState('buy')
    const [showConfirmation, setShowConfirmation] = useState(false)

    // Update selected crypto when prop changes
    React.useEffect(() => {
        if (selectedCryptoForPurchase) {
            setSelectedCrypto(selectedCryptoForPurchase.id)
        }
    }, [selectedCryptoForPurchase])

    const currentCrypto = cryptoData.find(c => c.id === selectedCrypto)

    const formatPrice = (price) => {
        if (!price) return '$0.00'
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: price < 10 ? 4 : 2,
            maximumFractionDigits: price < 10 ? 4 : 2
        }).format(price)
    }

    const total = currentCrypto && amount ? currentCrypto.precio * parseFloat(amount) : 0

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!selectedCrypto || !amount || parseFloat(amount) <= 0) return

        setShowConfirmation(true)

        // Reset after 3 seconds
        setTimeout(() => {
            setShowConfirmation(false)
            setAmount('')
        }, 3000)
    }

    if (!isPurchaseMenuOpen) return null

    return (
        <>
            {/* Overlay */}
            <div className="purchase-overlay" onClick={closePurchaseMenu} />

            {/* Menu Panel */}
            <div className="purchase-menu">
                <div className="purchase-header">
                    <h2>{purchaseType === 'buy' ? '💰 Comprar' : '📤 Vender'} Crypto</h2>
                    <button className="close-button" onClick={closePurchaseMenu}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </button>
                </div>

                {/* Purchase Type Toggle */}
                <div className="purchase-toggle">
                    <button
                        className={`toggle-btn ${purchaseType === 'buy' ? 'active' : ''}`}
                        onClick={() => setPurchaseType('buy')}
                    >
                        Comprar
                    </button>
                    <button
                        className={`toggle-btn ${purchaseType === 'sell' ? 'active' : ''}`}
                        onClick={() => setPurchaseType('sell')}
                    >
                        Vender
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="purchase-form">
                    {/* Crypto Selector */}
                    <div className="form-group">
                        <label>Criptomoneda</label>
                        <select
                            value={selectedCrypto}
                            onChange={(e) => setSelectedCrypto(e.target.value)}
                            required
                        >
                            <option value="">Seleccionar...</option>
                            {cryptoData.map(crypto => (
                                <option key={crypto.id} value={crypto.id}>
                                    {crypto.nombre} ({crypto.symbol})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Current Price Display */}
                    {currentCrypto && (
                        <div className="current-price-display">
                            <span className="price-label">Precio actual</span>
                            <span className="price-value">{formatPrice(currentCrypto.precio)}</span>
                            <span className={`price-change ${currentCrypto.cambio24h >= 0 ? 'positive' : 'negative'}`}>
                                {currentCrypto.cambio24h >= 0 ? '↑' : '↓'} {Math.abs(currentCrypto.cambio24h || 0).toFixed(2)}%
                            </span>
                        </div>
                    )}

                    {/* Amount Input */}
                    <div className="form-group">
                        <label>Cantidad {currentCrypto && `(${currentCrypto.symbol})`}</label>
                        <input
                            type="number"
                            step="0.0001"
                            min="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            required
                        />
                    </div>

                    {/* Total */}
                    <div className="purchase-total">
                        <span>Total</span>
                        <span className="total-value">{formatPrice(total)}</span>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`purchase-submit ${purchaseType}`}
                        disabled={!selectedCrypto || !amount}
                    >
                        <span>
                            {purchaseType === 'buy' ? 'Comprar' : 'Vender'} {currentCrypto?.symbol || 'Crypto'}
                        </span>
                    </button>

                    {/* Confirmation Message */}
                    {showConfirmation && (
                        <div className="purchase-confirmation">
                            ✅ Orden de {purchaseType === 'buy' ? 'compra' : 'venta'} simulada exitosamente
                        </div>
                    )}
                </form>

                {/* Disclaimer */}
                <p className="purchase-disclaimer">
                    * Esta es una simulación. No se realizan transacciones reales.
                </p>
            </div>
        </>
    )
}

export default PurchaseMenu
