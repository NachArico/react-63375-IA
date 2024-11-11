import React from 'react'
import CryptoItem from './CryptoItem'

function CryptoList({product}) {
  return (
    <div>
        {product.map((prod) => {
            return (
                <CryptoItem key={prod.id} item={prod}/>
            )
        })}
    </div>
  )
}

export default CryptoList