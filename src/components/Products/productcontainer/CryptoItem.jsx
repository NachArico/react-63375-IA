import React from 'react'
import { Link } from 'react-router-dom'



function CryptoItem({ item }) {
  return (
    <div className="containerCard" >
      <div className="card" style={{ flexDirection: "column" }}>
        <h2>{item.nombre}</h2>
        <p>{item.precio}</p>
        <p>{item.categoria}</p>
        <img src={item.imagen} alt={item.nombre} width={"50px"} />
      </div>
      <Link to ={`/detail/${item.id}`}>
      <button>
        <span> Ver mas </span>
      </button>
      </Link>
    </div>
  )
}

export default CryptoItem