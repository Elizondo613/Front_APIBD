import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ProyectoNuevo () {
    const [id, setId] = useState('')

    const handleChange = (event) => {
      setId(event.target.value);
    }

  const [proyectData, setProyectData] = useState({
    _id: '',
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    presupuesto: 0
  })

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    
    setProyectData(prevData => ({
        ...prevData,
        [name]: value
    }))
  }

  const handleUpdateData = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify(proyectData))
    try {
        const response = await fetch(`http://localhost:4000/api/proyecto/${proyectData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(proyectData)
        });

        if(response.ok){
            console.log("Actualización exitosa");
        } else {
            throw new Error('Error al actualizar el dato');
        }
    } catch (error) {
        console.error('Error en la solicitud PUT:', error);
    }
  }

  const formRef = useRef(null)

  return (
    <>
    <h1>Actualizar proyecto</h1>
      {
          <Form onSubmit={handleUpdateData} ref={formRef}>
            <div className='row'>
              <input 
                type="text"
                name='_id'
                value={proyectData._id}
                onChange={handleInputChange}
                placeholder='Ingresa id para actualizar'
              />
              <Form.Group  className="mb-3 col-6" >
                <Form.Label>Nombre</Form.Label>
                <Form.Control name='nombre' value={proyectData.nombre} type="text" placeholder="Nombre..." onChange={handleInputChange}/>
              </Form.Group>
              <Form.Group  className="mb-3 col-6" >
                <Form.Label>Fecha de inicio</Form.Label>
                <Form.Control name='fechaInicio' value={proyectData.fechaInicio} type="text" placeholder="fecha inicio..." onChange={handleInputChange}/>
              </Form.Group>
              <Form.Group  className="mb-3 col-6" >
                <Form.Label>Fecha de finalización</Form.Label>
                <Form.Control name='fechaFin' value={proyectData.fechaFin} type="text" placeholder="fecha fin..." onChange={handleInputChange}/>
              </Form.Group>
              <Form.Group  className="mb-3 col-6" >
                <Form.Label>Presupuesto</Form.Label>
                <Form.Control name='presupuesto' value={proyectData.presupuesto} type="number" placeholder="presupuesto..." onChange={handleInputChange}/>
              </Form.Group>
            </div>
            <div className='row justify-content-center mt-3'>
              <Button variant="success" className='col-3' type="submit">
                Actualizar
              </Button>
            </div>
          </Form>
      }
    </>
  )
}