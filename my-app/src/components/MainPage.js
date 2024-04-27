import React, { useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import './MainPage.css';

const SideNavbar = () => {
  useEffect(() => {
    // Función para mover las botellas de forma aleatoria
    const moveBottles = () => {
      const bottles = document.querySelectorAll('.bottle');
      bottles.forEach(bottle => {
        const x = Math.random() * window.innerWidth; // Posición X aleatoria dentro del ancho de la ventana
        const y = Math.random() * window.innerHeight; // Posición Y aleatoria dentro de la altura de la ventana
        bottle.style.left = `${x}px`; // Establece la posición izquierda de la botella
        bottle.style.top = `${y}px`; // Establece la posición superior de la botella
      });
    };

    // Llama a la función para mover las botellas cada 2 segundos (puedes ajustar este valor según sea necesario)
    const interval = setInterval(moveBottles, 2000);

    // Limpia el intervalo cuando el componente se desmonta para evitar pérdida de rendimiento
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="flex-column">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/proveedor">Proveedor</Nav.Link>
            <Nav.Link as={Link} to="/cliente">Cliente</Nav.Link>
            <Nav.Link as={Link} to="/inventario">Inventario</Nav.Link>
            <Nav.Link as={Link} to="/compra">Compra</Nav.Link>
            <Nav.Link as={Link} to="/venta">Venta</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <img className="bottle" src="../images/bottle.jpg" alt="Botella 1" />
      <img className="bottle" src="../images/bottle2.jpg" alt="Botella 2" />
      <img className="bottle" src="../images/bottle3.jpg" alt="Botella 3" />
    </div>
  );
};

export default SideNavbar;