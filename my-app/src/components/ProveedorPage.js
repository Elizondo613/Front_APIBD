import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Proveedor.css'; // Importa tus estilos CSS personalizados aquí si es necesario

const Proveedor = () => {
  return (
    <div>
      {/* Franja azul (TopBar) */}
      <div className="top-bar"></div>

      {/* Barra de navegación */}
      <Navbar bg="dark" variant="dark" expand="lg" className="flex-column">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
            {/* Agrega más enlaces si es necesario */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Formulario de Proveedor */}
      <div className="form-container">
        <h2>Formulario de Proveedor</h2>
        <Form>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Ingrese su nombre" />
          </Form.Group>

          <Form.Group controlId="formApellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" placeholder="Ingrese su apellido" />
          </Form.Group>

          <Form.Group controlId="formCodigo">
            <Form.Label>Código</Form.Label>
            <Form.Control type="text" placeholder="Ingrese su código" />
          </Form.Group>

          <Form.Group controlId="formNit">
            <Form.Label>NIT</Form.Label>
            <Form.Control type="text" placeholder="Ingrese su NIT" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Proveedor;
