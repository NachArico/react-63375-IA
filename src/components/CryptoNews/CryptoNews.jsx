import React, { useState, useEffect } from 'react'
import { fetchCryptoNews } from '../../services/cryptoApi'

const CryptoNews = ({ symbol = 'BTC', coinName = 'Bitcoin' }) => {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadNews = async () => {
            setLoading(true)
            const newsData = await fetchCryptoNews(symbol)
            setNews(newsData || [])
            setLoading(false)
        }

        loadNews()
    }, [symbol])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffHours = Math.floor((now - date) / (1000 * 60 * 60))

        if (diffHours < 1) return 'Hace menos de 1 hora'
        if (diffHours < 24) return `Hace ${diffHours} horas`

        const diffDays = Math.floor(diffHours / 24)
        if (diffDays === 1) return 'Ayer'
        if (diffDays < 7) return `Hace ${diffDays} días`

        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short'
        })
    }

    if (loading) {
        return (
            <div className="news-container">
                <h3 className="news-title">📰 Noticias de {coinName}</h3>
                <div className="news-loading">
                    <div className="skeleton news-skeleton"></div>
                    <div className="skeleton news-skeleton"></div>
                    <div className="skeleton news-skeleton"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="news-container">
            <h3 className="news-title">📰 Noticias de {coinName}</h3>

            {news.length === 0 ? (
                <p className="news-empty">No hay noticias disponibles</p>
            ) : (
                <ul className="news-list">
                    {news.map(item => (
                        <li key={item.id} className="news-item">
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="news-link"
                            >
                                <span className="news-headline">{item.title}</span>
                                <div className="news-meta">
                                    <span className="news-source">{item.source}</span>
                                    <span className="news-time">{formatDate(item.publishedAt)}</span>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CryptoNews
