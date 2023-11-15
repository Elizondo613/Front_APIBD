import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function EncargadoNuevo () {
  const [id, setId] = useState('')

  const handleInputChange = (event) => {
    setId(event.target.value);
  }

  const formRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    let tmpEncargado = {
      nombre: event.target.inputNombre.value,
      direccion: event.target.inputDireccion.value,
      dpi: event.target.inputDpi.value
    }
    
    newEncargadoAPI(tmpEncargado)

    formRef.current.reset()
  }

  //INGRESAR NUEVO ENCARGADO
  const newEncargadoAPI = (encargado) => {

    fetch("http://localhost:4000/api/encargado/" + id, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(encargado)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
    <h1>Nuevo encargado</h1>
      {
          <Form onSubmit={handleSubmit} ref={formRef}>
            <div className='row'>
              <input 
                type="text"
                value={id}
                onChange={handleInputChange}
                placeholder='Id del proyecto'
              />
              <Form.Group className="mb-3 col-6" controlId="inputNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Nombre..." />
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="inputDireccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" placeholder="Dirección..." />
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="inputDpi">
                <Form.Label>DPI</Form.Label>
                <Form.Control type="text" placeholder="DPI..." />
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