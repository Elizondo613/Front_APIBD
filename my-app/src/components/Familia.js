import React, { useRef, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export default function FamiliaNueva () {
  const [familia, setFamilia] = useState([])
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

    //OBTENER FAMILIA
    useEffect(() => {
        const getFamilia = () => {
            fetch('http://localhost:4000/api/' + id +'/familia')
            .then(res => res.json())
            .then(data=>{
                setFamilia(data)
              })
        }
        getFamilia()
    
      },[])

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
        <div className='mb-3'></div>
      <div>
        {
            familia.map((item, index) => (
            <Card className='mt-4' key={index} style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">Dirección:</Card.Subtitle>
                <Card.Text>{item.direccion}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Ingreso:</Card.Subtitle>
                <Card.Text>{item.ingreso}</Card.Text>
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