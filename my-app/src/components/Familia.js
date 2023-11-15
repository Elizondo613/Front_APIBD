import React, { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export default function FamiliaNueva () {
  const [id, setId] = useState('')
  const [familia, setFamilia] = useState([])

  const handleInputChange = (event) => {
    setId(event.target.value);
  }

  const formRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    let tmpFamilia = {
      direccion: event.target.inputDireccion.value,
      ingreso: event.target.inputIngreso.value,
      integrante: event.target.inputIntegrante.value
    }
    
    newFamiliaAPI(tmpFamilia)

    formRef.current.reset()
  }

  //INGRESAR NUEVA FAMILIA
  const newFamiliaAPI = (familia) => {

    fetch("http://localhost:4000/api/familia", {
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

  useEffect(() => {
    const getFamilia = () => {
        fetch('http://localhost:4000/api/familia')
        .then(res => res.json())
        .then(data=>{
            setFamilia(data)
          })
    }
    getFamilia()

  },[])

  return (
    <>
    <h1>Familia</h1>
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
              <Form.Group className="mb-3 col-6" controlId="inputIntegrante">
                <Form.Label>Integrante</Form.Label>
                <Form.Control type="text" placeholder="Integrante..." />
              </Form.Group>
            </div>
            <div className='row justify-content-center mt-3'>
              <Button variant="success" className='col-3' type="submit">
                Registrar
              </Button>
            </div>
          </Form>
      }
      <div className='row'>
        {
                          familia.map((item, index) => (
                            <Card className='mt-4' key={index} style={{ width: '18rem', marginRight: '20px' }}>
                            <Card.Body>
                            <Card.Text>Dirección:</Card.Text>
                            <Card.Title>{item.direccion}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Ingresos:</Card.Subtitle>
                            <Card.Text>{item.ingreso}</Card.Text>
                            <Card.Subtitle className="mb-2 text-muted">Integrante:</Card.Subtitle>
                            <Card.Text>{item.integrante}</Card.Text>
                            </Card.Body>
                        </Card>
                        ))
        }
      </div>
    </>
  )
}