import React, { useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Header from './Header/Header'
import Products from './Products/Products'

function Inicio() {
  const {CategoryID} = useParams()
  useEffect(() => {
  }, [CategoryID])
  
  return (   
<div>
{!CategoryID && 
<div>  <Header></Header> 


  <div className='cardMenu'>  
    <div className='containerCard'>
    <div className="card" style={{flexDirection:"column"}}>
  <p className="title">Bitcoin</p>
  <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" alt="" width={"50px"} />
</div>
<Link to="/category/volatil">
  <button>
  <span> Llevame ahí </span>
</button>
</Link>
</div>

<div className='containerCard'>
<div className="card" style={{flexDirection:"column"}}>
  <p className="title">Ethereum</p>
  <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="" width={"50px"} />
  </div>
  <Link to="/category/volatil">
  <button>
  <span> Llevame ahí </span>
</button>
</Link>
</div>

<div className='containerCard'>
<div className="card" style={{flexDirection:"column"}}>
  <p className="title">Cardano</p>
  <img src="https://cryptologos.cc/logos/cardano-ada-logo.png" alt="" width={"50px"} />
  </div> 
  <Link to="/category/volatil">
  <button>
  <span> Llevame ahí </span>
</button>
</Link>
</div>
</div> </div>}
{CategoryID && <div>
  <Products CategoryID={CategoryID}>

  </Products>
  </div>}
</div>
  )
}

export default Inicio