import React, { useRef, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export default function EncargadoNuevo () {
  const [encargado, setEncargado] = useState([])
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

  //OBTENER ENCARGADO
  useEffect(() => {
    const getEncargado = () => {
        fetch('http://localhost:4000/api/' + id + '/encargado')
        .then(res => res.json())
        .then(data=>{
            setEncargado(data)
          })
    }
    getEncargado()

  },[])

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
      <div className='mb-3'></div>
      <div>
        {
            encargado.map((item, index) => (
            <Card className='mt-4' key={index} style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Text>Nombre:</Card.Text>
                <Card.Title>{item.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Dirección:</Card.Subtitle>
                <Card.Text>{item.direccion}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">DPI</Card.Subtitle>
                <Card.Text>{item.dpi}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Proyecto:</Card.Subtitle>
                <Card.Text>{item.proyecto}</Card.Text>
                </Card.Body>
            </Card>
            ))
        }
      </div>
    </>
  )
}