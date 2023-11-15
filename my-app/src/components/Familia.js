import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function FamiliaNueva () {
  const [id, setId] = useState('')

  const handleInputChange = (event) => {
    setId(event.target.value);
  }

  const formRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    let tmpFamilia = {
      direccion: event.target.inputDireccion.value,
      ingreso: event.target.inputIngreso.value
    }
    
    newFamiliaAPI(tmpFamilia)

    formRef.current.reset()
  }

  //INGRESAR NUEVA FAMILIA
  const newFamiliaAPI = (familia) => {

    fetch("http://localhost:4000/api/familia/" + id, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(familia)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
    <h1>Nueva familia</h1>
      {
          <Form onSubmit={handleSubmit} ref={formRef}>
            <div className='row'>
              <input 
                type="text"
                value={id}
                onChange={handleInputChange}
                placeholder='Id del proyecto'
              />
              <Form.Group className="mb-3 col-6" controlId="inputDireccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" placeholder="Dirección..." />
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="inputIngreso">
                <Form.Label>Ingreso</Form.Label>
                <Form.Control type="Number" placeholder="Ingreso..." />
              </Form.Group>
            </div>
            <div className='row justify-content-center mt-3'>
              <Button variant="success" className='col-3' type="submit">
                Registrar
              </Button>
            </div>
          </Form>
      }
    </>
  )
}