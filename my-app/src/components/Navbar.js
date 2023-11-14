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
import Card from 'react-bootstrap/Card';

function NavScrollExample() {
    const [searchId, setSearchId] = useState('')
    const [proyecto, setProyecto] = useState([])

    const handleInputChange = (event) => {
        setSearchId(event.target.value);
    }

    const handleSearch = (event) => {
        event.preventDefault()
        
        const getProyecto = () => {
            fetch('http://localhost:4000/api/proyecto' + searchId)
            .then(res => res.json())
            .then(data=>{
                setProyecto(data)
              })
        }
        getProyecto()
    }

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
            </Routes>
        </div>
        <div>
            {
                proyecto.map((item, index) => (
                <Card className='mt-4' key={index} style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Text>Nombre:</Card.Text>
                    <Card.Title>{item.nombre}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">ID:</Card.Subtitle>
                    <Card.Text>{item._id}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Fecha de inicio</Card.Subtitle>
                    <Card.Text>{item.fechaInicio}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Fecha de finalización</Card.Subtitle>
                    <Card.Text>{item.fechaFin}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Encargado</Card.Subtitle>
                    <Card.Text>{item.encargado}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Familia</Card.Subtitle>
                    <Card.Text>{item.familia}</Card.Text>
                    </Card.Body>
                </Card>
                ))
            }
        </div>
    </Router>
  );
}

export default NavScrollExample;