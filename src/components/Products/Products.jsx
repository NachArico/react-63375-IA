import React, { useEffect, useState } from 'react'
import "./Products.css"
import { getCrypto } from '../../crypto'
import CryptoList from './productcontainer/CryptoList'

const Products = () => {
    const [crypto, setCrypto] = useState ([])
    useEffect (() => {
        getCrypto ()
        .then ((res) => [
            setCrypto (res)
        ])
    },[crypto])
  return ( <>
<CryptoList product={crypto}/>
</>

  )
}

export default Products