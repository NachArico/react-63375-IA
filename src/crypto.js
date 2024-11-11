const crypto = [
    {
        "id": 1,
        "nombre": "bitcoin",
        "precio": 35000,
        "cantidad": 0.5,
        "imagen": "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
      },
      {
        "id": 2,
        "nombre": "ethereum",
        "precio": 2000,
        "cantidad": 1.2,
        "imagen": "https://cryptologos.cc/logos/ethereum-eth-logo.png"
      },
      {
        "id": 3,
        "nombre": "ripple",
        "precio": 0.45,
        "cantidad": 1000,
        "imagen": "https://cryptologos.cc/logos/ripple-xrp-logo.png"
      },
      {
        "id": 4,
        "nombre": "litecoin",
        "precio": 150,
        "cantidad": 10,
        "imagen": "https://cryptologos.cc/logos/litecoin-ltc-logo.png"
      },
      {
        "id": 5,
        "nombre": "cardano",
        "precio": 1.2,
        "cantidad": 500,
        "imagen": "https://cryptologos.cc/logos/cardano-ada-logo.png"
      }
]
export const getCrypto = () => {
    return new Promise((resolve) => {
        setTimeout (()=> {
            resolve (crypto)
        },1000)
    })
}