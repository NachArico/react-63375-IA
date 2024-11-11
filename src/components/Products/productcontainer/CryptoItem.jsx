import React from 'react'

function CryptoItem({item}) {
  return (
    <div>
        <h2>{item.nombre}</h2>
        <p>{item.precio}</p>
        <p>{item.cantidad}</p>
        <img src={item.imagen} alt={item.nombre} />
        <button> Ver mas</button>
    </div>
  )
}

export default CryptoItem