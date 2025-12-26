// CoinGecko API - Free, no API key required
const COINGECKO_BASE = 'https://api.coingecko.com/api/v3'

// Map our crypto IDs to CoinGecko IDs
export const CRYPTO_IDS = {
    bitcoin: 'bitcoin',
    ethereum: 'ethereum',
    cardano: 'cardano',
    usdt: 'tether',
    usdc: 'usd-coin'
}

// Fetch current prices for multiple cryptos
export const fetchCryptoPrices = async (ids = Object.values(CRYPTO_IDS)) => {
    try {
        const idsParam = ids.join(',')
        const response = await fetch(
            `${COINGECKO_BASE}/simple/price?ids=${idsParam}&vs_currencies=usd&include_24hr_change=true`
        )

        if (!response.ok) throw new Error('Failed to fetch prices')

        return await response.json()
    } catch (error) {
        console.error('Error fetching crypto prices:', error)
        return null
    }
}

// Fetch detailed market data for cryptos
export const fetchCryptoMarketData = async (ids = Object.values(CRYPTO_IDS)) => {
    try {
        const idsParam = ids.join(',')
        const response = await fetch(
            `${COINGECKO_BASE}/coins/markets?vs_currency=usd&ids=${idsParam}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`
        )

        if (!response.ok) throw new Error('Failed to fetch market data')

        const data = await response.json()

        // Transform to our format
        return data.map(coin => ({
            id: coin.id,
            nombre: coin.name,
            symbol: coin.symbol.toUpperCase(),
            precio: coin.current_price,
            imagen: coin.image,
            cambio24h: coin.price_change_percentage_24h,
            marketCap: coin.market_cap,
            volumen24h: coin.total_volume,
            high24h: coin.high_24h,
            low24h: coin.low_24h,
            categoria: ['tether', 'usd-coin'].includes(coin.id) ? 'stable' : 'volatil'
        }))
    } catch (error) {
        console.error('Error fetching market data:', error)
        return null
    }
}

// Fetch single crypto details
export const fetchCryptoDetails = async (id) => {
    try {
        const response = await fetch(
            `${COINGECKO_BASE}/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`
        )

        if (!response.ok) throw new Error('Failed to fetch crypto details')

        const data = await response.json()

        return {
            id: data.id,
            nombre: data.name,
            symbol: data.symbol.toUpperCase(),
            precio: data.market_data.current_price.usd,
            imagen: data.image.large,
            cambio24h: data.market_data.price_change_percentage_24h,
            marketCap: data.market_data.market_cap.usd,
            volumen24h: data.market_data.total_volume.usd,
            high24h: data.market_data.high_24h.usd,
            low24h: data.market_data.low_24h.usd,
            descripcion: data.description?.en || '',
            categoria: ['tether', 'usd-coin'].includes(data.id) ? 'stable' : 'volatil'
        }
    } catch (error) {
        console.error('Error fetching crypto details:', error)
        return null
    }
}

// Fetch crypto news - returns links to real news sources
export const fetchCryptoNews = async (coinSymbol = 'BTC') => {
    // Map symbols to full names
    const symbolToName = {
        'BTC': 'bitcoin',
        'ETH': 'ethereum',
        'ADA': 'cardano',
        'USDT': 'tether',
        'USDC': 'usd-coin'
    }

    const coinName = symbolToName[coinSymbol] || coinSymbol.toLowerCase()

    // Return curated real news links
    return getRealNewsLinks(coinSymbol, coinName)
}

// Real news links to major crypto news sources
const getRealNewsLinks = (symbol, coinName) => {
    const newsLinks = {
        BTC: [
            {
                title: 'Bitcoin: Últimas noticias y análisis del mercado',
                url: 'https://www.coindesk.com/tag/bitcoin/',
                source: 'CoinDesk'
            },
            {
                title: 'Bitcoin News - Precio, análisis y actualizaciones',
                url: 'https://cointelegraph.com/tags/bitcoin',
                source: 'CoinTelegraph'
            },
            {
                title: 'Análisis técnico de Bitcoin en tiempo real',
                url: 'https://www.tradingview.com/symbols/BTCUSD/',
                source: 'TradingView'
            },
            {
                title: 'Bitcoin en CoinGecko - Datos y estadísticas',
                url: 'https://www.coingecko.com/en/coins/bitcoin',
                source: 'CoinGecko'
            },
            {
                title: 'Comunidad Bitcoin en Reddit',
                url: 'https://www.reddit.com/r/Bitcoin/',
                source: 'Reddit'
            }
        ],
        ETH: [
            {
                title: 'Ethereum: Últimas noticias y actualizaciones',
                url: 'https://www.coindesk.com/tag/ethereum/',
                source: 'CoinDesk'
            },
            {
                title: 'Ethereum News - DeFi y Smart Contracts',
                url: 'https://cointelegraph.com/tags/ethereum',
                source: 'CoinTelegraph'
            },
            {
                title: 'Análisis técnico de Ethereum',
                url: 'https://www.tradingview.com/symbols/ETHUSD/',
                source: 'TradingView'
            },
            {
                title: 'Ethereum en CoinGecko',
                url: 'https://www.coingecko.com/en/coins/ethereum',
                source: 'CoinGecko'
            },
            {
                title: 'Comunidad Ethereum en Reddit',
                url: 'https://www.reddit.com/r/ethereum/',
                source: 'Reddit'
            }
        ],
        ADA: [
            {
                title: 'Cardano: Desarrollo y actualizaciones',
                url: 'https://www.coindesk.com/tag/cardano/',
                source: 'CoinDesk'
            },
            {
                title: 'Cardano News - Smart Contracts y Staking',
                url: 'https://cointelegraph.com/tags/cardano',
                source: 'CoinTelegraph'
            },
            {
                title: 'Análisis técnico de Cardano',
                url: 'https://www.tradingview.com/symbols/ADAUSD/',
                source: 'TradingView'
            },
            {
                title: 'Cardano en CoinGecko',
                url: 'https://www.coingecko.com/en/coins/cardano',
                source: 'CoinGecko'
            },
            {
                title: 'Comunidad Cardano en Reddit',
                url: 'https://www.reddit.com/r/cardano/',
                source: 'Reddit'
            }
        ],
        USDT: [
            {
                title: 'Tether: Noticias sobre stablecoins',
                url: 'https://www.coindesk.com/tag/tether/',
                source: 'CoinDesk'
            },
            {
                title: 'Tether News y actualizaciones',
                url: 'https://cointelegraph.com/tags/tether',
                source: 'CoinTelegraph'
            },
            {
                title: 'Tether en CoinGecko',
                url: 'https://www.coingecko.com/en/coins/tether',
                source: 'CoinGecko'
            },
            {
                title: 'Transparencia de Tether',
                url: 'https://tether.to/en/transparency/',
                source: 'Tether.to'
            },
            {
                title: 'Tether en CoinMarketCap',
                url: 'https://coinmarketcap.com/currencies/tether/',
                source: 'CoinMarketCap'
            }
        ],
        USDC: [
            {
                title: 'USD Coin: Noticias sobre stablecoins',
                url: 'https://www.coindesk.com/tag/usdc/',
                source: 'CoinDesk'
            },
            {
                title: 'USDC News y actualizaciones',
                url: 'https://cointelegraph.com/tags/usdc',
                source: 'CoinTelegraph'
            },
            {
                title: 'USDC en CoinGecko',
                url: 'https://www.coingecko.com/en/coins/usd-coin',
                source: 'CoinGecko'
            },
            {
                title: 'Circle - Emisor de USDC',
                url: 'https://www.circle.com/en/usdc',
                source: 'Circle'
            },
            {
                title: 'USDC en CoinMarketCap',
                url: 'https://coinmarketcap.com/currencies/usd-coin/',
                source: 'CoinMarketCap'
            }
        ]
    }

    // Default news for other coins
    const defaultNews = [
        {
            title: `${symbol}: Últimas noticias en CoinDesk`,
            url: `https://www.coindesk.com/search?q=${coinName}`,
            source: 'CoinDesk'
        },
        {
            title: `${symbol}: Noticias y análisis`,
            url: `https://cointelegraph.com/search?query=${coinName}`,
            source: 'CoinTelegraph'
        },
        {
            title: `Análisis técnico de ${symbol}`,
            url: `https://www.tradingview.com/symbols/${symbol}USD/`,
            source: 'TradingView'
        },
        {
            title: `${symbol} en CoinGecko`,
            url: `https://www.coingecko.com/en/coins/${coinName}`,
            source: 'CoinGecko'
        },
        {
            title: `Información de mercado ${symbol}`,
            url: `https://coinmarketcap.com/currencies/${coinName}/`,
            source: 'CoinMarketCap'
        }
    ]

    const selectedNews = newsLinks[symbol] || defaultNews

    return selectedNews.map((news, index) => ({
        id: index,
        title: news.title,
        url: news.url,
        source: news.source,
        publishedAt: new Date(Date.now() - index * 7200000).toISOString()
    }))
}
