import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export default function ProveedorNuevo() {
  const [proveedor, setProveedor] = useState([]);
  const [inUpdated, setInUpdated] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  const navigate = useNavigate();

  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    let tmpProveedor = {
      nombre: event.target.inputNombre.value,
      apellido: event.target.inputApellido.value,
      codigo: event.target.inputCodigo.value,
      nit: event.target.inputNit.value,
      departamento: event.target.inputDepartamento.value,
      municipio: event.target.inputMunicipio.value,
      correo: event.target.inputCorreo.value,
      telefono: event.target.inputTelefono.value,
    };

    if (selectedProveedor) {
      // Si hay un proveedor seleccionado, actualiza
      updateProveedor(selectedProveedor._id, tmpProveedor);
    } else {
      // Si no, crea un nuevo proveedor
      newProyectAPI(tmpProveedor);
    }

    formRef.current.reset();
  };

  const newProyectAPI = (proveedor) => {
    fetch('http://localhost:4000/proveedor/proveedores', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(proveedor),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInUpdated(true);
      })
      .catch((err) => console.log(err));
  };

  const updateProveedor = (_id, updatedData) => {
    fetch(`http://localhost:4000/proveedor/proveedores/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInUpdated(true);
        setSelectedProveedor(null); // Después de la actualización, deselecciona el proveedor
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (_id) => {
    const requestInit = {
      method: 'DELETE',
    };
    fetch('http://localhost:4000/proveedor/proveedores/' + _id, requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));

    setInUpdated(true);
  };

  useEffect(() => {
    const getProveedor = () => {
      fetch('http://localhost:4000/proveedor/proveedores')
        .then((res) => res.json())
        .then((data) => {
          setProveedor(data);
        });
    };
    getProveedor();
  }, []);

  // Función para cargar los datos del proveedor seleccionado en el formulario
  const handleEdit = (selectedProveedor) => {
    setSelectedProveedor(selectedProveedor);
    formRef.current.reset();
    // Llena los campos del formulario con los datos del proveedor seleccionado
    formRef.current.inputNombre.value = selectedProveedor.nombre;
    formRef.current.inputApellido.value = selectedProveedor.apellido;
    formRef.current.inputCodigo.value = selectedProveedor.codigo;
    formRef.current.inputNit.value = selectedProveedor.nit;
    formRef.current.inputDepartamento.value = selectedProveedor.departamento;
    formRef.current.inputMunicipio.value = selectedProveedor.municipio;
    formRef.current.inputCorreo.value = selectedProveedor.correo;
    formRef.current.inputTelefono.value = selectedProveedor.telefono;
  };

  return (
    <>
      <h1>Proveedor nuevo</h1>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <div className='row'>
          <Form.Group className='mb-3 col-6' controlId='inputNombre'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type='text' placeholder='Nombre...' />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="inputApellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control type="text" placeholder="apellido..." />
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="inputCodigo">
                <Form.Label>Código</Form.Label>
                <Form.Control type="number" placeholder="codigo..." />
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="inputNit">
                <Form.Label>NIT</Form.Label>
                <Form.Control type="number" placeholder="nit..." />
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="inputDepartamento">
                <Form.Label>Departamento</Form.Label>
                <Form.Control type="text" placeholder="Departamento..." />
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="inputMunicipio">
                <Form.Label>Municipio</Form.Label>
                <Form.Control type="text" placeholder="Municipio..." />
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="inputCorreo">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="text" placeholder="Correo..." />
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="inputTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="number" placeholder="Teléfono..." />
              </Form.Group>
        </div>
        <div className='row justify-content-center mt-3'>
          <Button variant='success' className='col-3' type='submit' style={{ marginRight: '20px' }}>
            {selectedProveedor ? 'Actualizar' : 'Registrar'}
          </Button>
        </div>
      </Form>
      <div className='row'>
        {proveedor.map((item, index) => (
          <Card className='mt-4' key={index} style={{ width: '18rem', marginRight: '20px' }}>
            <Card.Body>
              <Card.Text>Nombre:</Card.Text>
              <Card.Title>{item.nombre}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">ID:</Card.Subtitle>
                  <Card.Title>{item.apellido}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Apellido:</Card.Subtitle>
                  <Card.Text>{item._id}</Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">Nit:</Card.Subtitle>
                  <Card.Text>{item.nit}</Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">Departamento:</Card.Subtitle>
                  <Card.Text>{item.departamento}</Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">Municipio:</Card.Subtitle>
                  <Card.Text>{item.municipio}</Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">Correo:</Card.Subtitle>
                  <Card.Text>{item.correo}</Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">Teléfono:</Card.Subtitle>
                  <Card.Text>{item.telefono}</Card.Text>
              <button onClick={() => handleEdit(item)} className='mt-3 btn btn-primary'>
                Editar
              </button>
              <button onClick={() => handleDelete(item._id)} className='mt-3 btn btn-danger'>
                Eliminar
              </button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}