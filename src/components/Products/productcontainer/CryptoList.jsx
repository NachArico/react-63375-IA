import React, { useEffect } from 'react'
import CryptoItem from './CryptoItem'


function CryptoList({product}) {
  return (
    <div className = "containerCryptos">
        {product.map((prod) => {
            return (
                <CryptoItem key={prod.id} item={prod}/>
            )
        })}
    </div>
  )
}

export default CryptoList