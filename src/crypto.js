const crypto = [
    {
        "id": 1,
        "nombre": "bitcoin",
        "precio": 95000,
        "categoria": "volatil",
        "imagen": "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
      },
      {
        "id": 2,
        "nombre": "ethereum",
        "precio": 2000,
        "categoria": "volatil",
        "imagen": "https://cryptologos.cc/logos/ethereum-eth-logo.png"
      },
      {
        "id": 3,
        "nombre": "USDT",
        "precio": 1,
        "categoria": "stable",
        "imagen": "https://cryptologos.cc/logos/tether-usdt-logo.png?v=040"
      },
      {
        "id": 4,
        "nombre": "USDC",
        "precio": 1,
        "categoria": "stable",
        "imagen": "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=040"
      },
      {
        "id": 5,
        "nombre": "cardano",
        "precio": 1.2,
        "categoria": "volatil",
        "imagen": "https://cryptologos.cc/logos/cardano-ada-logo.png"
      }
]
export const getCrypto = () => {
    return new Promise((resolve) => {
        setTimeout (()=> {
            resolve (crypto)
        },1)
    })
}
export const getCryptobyCategory = (id) => {
  return new Promise((resolve) => {
      setTimeout (()=> {
          resolve (crypto.filter(c=>c.categoria===id))
      },1)
  })
}
export const getCryptobyID = (id) => {
  return new Promise((resolve) => {
      setTimeout (()=> {
          resolve (crypto.filter(c=>c.id==id))
      },1)
  })
}