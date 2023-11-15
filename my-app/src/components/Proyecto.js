import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export default function ProyectoNuevo () {
  const [proyecto, setProyecto] = useState([])
  const [inUpdated, setInUpdated] = useState(false)

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Encargado');
  };

  const handleClickF = () => {
    navigate('/Familia');
  }

  const handleClickA = () => {
    navigate('/Actualizar')
  }

  const formRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    let tmpProyecto = {
      nombre: event.target.inputNombre.value,
      fechaInicio: event.target.inputFechaInicio.value,
      fechaFin: event.target.inputFechaFin.value,
      presupuesto: event.target.inputPresupuesto.value,
      encargado: event.target.inputEncargado.value,
      familia: event.target.inputFamilia.value
    }
    
    newProyectAPI(tmpProyecto)

    formRef.current.reset()
  }

  //INGRESAR NUEVO PROYECTO
  const newProyectAPI = (proyecto) => {

    fetch("http://localhost:4000/api/proyecto", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(proyecto)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  }

  //BORRAR PROYECTO
  const handleDelete = _id => {
    const requestInit = {
        method: 'DELETE'
    }
    fetch('http://localhost:4000/api/proyecto/' + _id, requestInit)
    .then(res => res.text()) 
    .then(res => console.log(res))

    setInUpdated(true)
  }

  //OBTENER PROYECTOS
  useEffect(() => {
    const getProyecto = () => {
        fetch('http://localhost:4000/api/proyecto')
        .then(res => res.json())
        .then(data=>{
            setProyecto(data)
          })
    }
    getProyecto()

  },[])

  return (
    <>
    <h1>Proyecto nuevo</h1>
      {
          <Form onSubmit={handleSubmit} ref={formRef}>
            <div className='row'>
              <Form.Group className="mb-3 col-6" controlId="inputNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Nombre..." />
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="inputFechaInicio">
                <Form.Label>Fecha de inicio</Form.Label>
                <Form.Control type="text" placeholder="fecha inicio..." />
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="inputFechaFin">
                <Form.Label>Fecha de finalización</Form.Label>
                <Form.Control type="text" placeholder="fecha fin..." />
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="inputPresupuesto">
                <Form.Label>Presupuesto</Form.Label>
                <Form.Control type="number" placeholder="presupuesto..." />
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="inputEncargado">
                <Form.Label>Encargado</Form.Label>
                <Form.Control type="text" placeholder="Encargado..." />
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="inputFamilia">
                <Form.Label>Familia</Form.Label>
                <Form.Control type="text" placeholder="Familia..." />
              </Form.Group>
            </div>
            <div className='row justify-content-center mt-3'>
              <Button variant="success" className='col-3' type="submit" style={{marginRight: '20px'}}>
                Registrar
              </Button>
              <Button variant="warning" className='col-3' onClick={handleClickA}>
                Actualizar
              </Button>
            </div>
          </Form>
      }
      <div className='row'>
            {
                proyecto.map((item, index) => (
                    <Card className='mt-4' key={index} style={{ width: '18rem', marginRight: '20px' }}>
                    <Card.Body>
                    <Card.Text>Nombre:</Card.Text>
                    <Card.Title>{item.nombre}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">ID:</Card.Subtitle>
                    <Card.Text>{item._id}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Fecha de inicio:</Card.Subtitle>
                    <Card.Text>{item.fechaInicio}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Fecha de finalización:</Card.Subtitle>
                    <Card.Text>{item.fechaFin}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Encargado:</Card.Subtitle>
                    <Card.Text>{item.encargado}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Familia:</Card.Subtitle>
                    <Card.Text>{item.familia}</Card.Text>
                    <button onClick={handleClick} className='btn btn-primary'>Añadir encargado</button>
                    <div>{" "}</div>
                    <button onClick={handleClickF} className='mt-3 btn btn-primary'>Añadir familia</button>
                    <div>{" "}</div>
                    <button onClick={() => handleDelete(item._id)} setInUpdated={setInUpdated} className='mt-3 btn btn-danger'>Eliminar</button>
                    </Card.Body>
                </Card>
                ))
            }
      </div>
    </>

  )
}