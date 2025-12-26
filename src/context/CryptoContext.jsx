import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { fetchCryptoMarketData } from '../services/cryptoApi'

const CryptoContext = createContext()

// Refresh interval in milliseconds (30 seconds)
const REFRESH_INTERVAL = 30000

export const CryptoProvider = ({ children }) => {
    const [cryptoData, setCryptoData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [lastUpdated, setLastUpdated] = useState(null)

    // Purchase menu state
    const [isPurchaseMenuOpen, setIsPurchaseMenuOpen] = useState(false)
    const [selectedCryptoForPurchase, setSelectedCryptoForPurchase] = useState(null)

    const loadCryptoData = useCallback(async () => {
        try {
            const data = await fetchCryptoMarketData()

            if (data) {
                setCryptoData(data)
                setLastUpdated(new Date())
                setError(null)
            }
        } catch (err) {
            setError('Error al cargar datos de criptomonedas')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [])

    // Initial load
    useEffect(() => {
        loadCryptoData()
    }, [loadCryptoData])

    // Auto-refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            loadCryptoData()
        }, REFRESH_INTERVAL)

        return () => clearInterval(interval)
    }, [loadCryptoData])

    // Get crypto by ID
    const getCryptoById = useCallback((id) => {
        return cryptoData.find(
            crypto => crypto.id === id || crypto.nombre.toLowerCase() === id.toLowerCase()
        )
    }, [cryptoData])

    // Get cryptos by category
    const getCryptosByCategory = useCallback((category) => {
        if (category === 'cryptos') return cryptoData
        return cryptoData.filter(crypto => crypto.categoria === category)
    }, [cryptoData])

    // Open purchase menu with selected crypto
    const openPurchaseMenu = useCallback((crypto = null) => {
        setSelectedCryptoForPurchase(crypto)
        setIsPurchaseMenuOpen(true)
    }, [])

    // Close purchase menu
    const closePurchaseMenu = useCallback(() => {
        setIsPurchaseMenuOpen(false)
        setSelectedCryptoForPurchase(null)
    }, [])

    const value = {
        cryptoData,
        loading,
        error,
        lastUpdated,
        getCryptoById,
        getCryptosByCategory,
        refreshData: loadCryptoData,
        // Purchase menu
        isPurchaseMenuOpen,
        selectedCryptoForPurchase,
        openPurchaseMenu,
        closePurchaseMenu
    }

    return (
        <CryptoContext.Provider value={value}>
            {children}
        </CryptoContext.Provider>
    )
}

export const useCrypto = () => {
    const context = useContext(CryptoContext)
    if (!context) {
        throw new Error('useCrypto must be used within a CryptoProvider')
    }
    return context
}

export default CryptoContext
