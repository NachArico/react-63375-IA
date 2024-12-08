import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCryptobyID } from '../../crypto'
import ItemCount from '../Contador/Contador'


function Detail() {
  const [crypto, setCrypto] = useState(null)
  const { id } = useParams()
  useEffect(() => {
    getCryptobyID(id)
      .then((res) => [
        setCrypto(res[0])
      ])
  }, [id])
  const [cantidad, setCantidad] = useState(1);

  const handleRestar = () => {
    cantidad > 1 && setCantidad(cantidad - 1)
  }

  const handleSumar = () => {
    setCantidad(cantidad + 1)
    console.log(crypto)
  }

  const handleAgregar = () => {
    console.log({ ...crypto, cantidad });
  }

  return (
    <div className="detailCrypto" >{crypto && <div>
      <div className="card" style={{ flexDirection: "column" }}>
      <h2>{crypto?.nombre}</h2>
      <p>{crypto?.precio}</p>
      </div>
      <ItemCount cantidad={cantidad} handleSumar={handleSumar} handleRestar={handleRestar} handleAgregar={handleAgregar} />
    </div>}
    </div>
  )
}

export default Detail