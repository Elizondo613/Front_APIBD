import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Proyecto from "./Proyecto";
import Encargado from './Encargado';
import Familia from './Familia';
import Actualizar from './Actualizar';
import Card from 'react-bootstrap/Card';

function ProjectCard({ project }) {
    return (
        <>
        <h2>Búsqueda realizada: </h2>
      <Card className='mt-4' style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Text>Nombre:</Card.Text>
          <Card.Title>{project.nombre}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">ID:</Card.Subtitle>
          <Card.Text>{project._id}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Fecha de inicio:</Card.Subtitle>
          <Card.Text>{project.fechaInicio}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Fecha de finalización:</Card.Subtitle>
          <Card.Text>{project.fechaFin}</Card.Text>
        </Card.Body>
      </Card>
      </>
    );
}

function NavScrollExample() {
    const [searchId, setSearchId] = useState('')
    const [proyecto, setProyecto] = useState([])

    const handleInputChange = (event) => {
        setSearchId(event.target.value);
    }

    const handleSearch = async (event) => {
        event.preventDefault();
        
        try {
          const response = await fetch(`http://localhost:4000/api/proyecto/${searchId}`);
          if (response.ok) {
            const data = await response.json();
            setProyecto(data);
          } else {
            throw new Error('Error al buscar el proyecto por ID');
          }
        } catch (error) {
          console.error('Error en la búsqueda:', error);
        }
      };

  return (
    <Router>
        <div>
            <Navbar bg="secondary" expand="lg">
            <Container fluid>
                <Navbar.Brand>Base de Datos</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link as={Link} to={"/Proyecto"}>Proyecto</Nav.Link>
                    <Nav.Link as={Link} to={"/Encargado"}>Encargado</Nav.Link>
                    <Nav.Link as={Link} to={"/Familia"}>Familia</Nav.Link>
                    <Nav.Link as={Link} to={"/Actualizar"}>Actualizar</Nav.Link>
                </Nav>
                <Form inline onSubmit={handleSearch} className="d-flex">
                    <Form.Control
                    type="text"
                    placeholder="Buscar por id..."
                    className="me-2"
                    value={searchId}
                    onChange={handleInputChange}
                    aria-label="Search"
                    />
                    <Button class="btn btn-success" type="onSubmit">Buscar</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
        <div>
            <Routes>
                <Route path="/Proyecto" element={<Proyecto/>}/>
                <Route path="/Encargado" element={<Encargado/>}/>
                <Route path="/Familia" element={<Familia/>}/>
                <Route path="/Actualizar" element={<Actualizar/>}/>
            </Routes>
        </div>
        <div>
        <Container>
        {proyecto ? (
          <ProjectCard project={proyecto} />
        ) : (
          <p>No se encontró ningún proyecto</p>
        )}
      </Container>
        </div>
    </Router>
  );
}

export default NavScrollExample;