import React, { useEffect, useState } from 'react'
import { getCrypto, getCryptobyCategory } from '../../crypto'
import CryptoList from './productcontainer/CryptoList'
import { collection, getDocs } from 'firebase/firestore'
import { db } from "../../firebase/config"

const Products = ({CategoryID}) => {
    const [crypto, setCrypto] = useState ([])
    useEffect (() => { 
      if (CategoryID === "cryptos"){
       getCrypto ()
        .then ((res) => [
            setCrypto (res)
        ]) 
      } 
      else {
        getCryptobyCategory (CategoryID)
        .then ((res) => [
            setCrypto (res)])

        
            const cryptoRef = collection (db, "cryptos");
            getDocs(cryptoRef)
            .then ((resp) => {
              resp.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
              })
            })
      }
    },[CategoryID])
  return ( <>
<CryptoList product={crypto}/>
</>

  )
}

export default Products