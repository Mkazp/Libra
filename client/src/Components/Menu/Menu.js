import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss'; // Import styles

const Menu = () => {
  return (
    <Navbar className={styles.menu} bg="dark" variant="dark" expand="lg">
      <Container className={styles.container}>
        <Nav.Link as={NavLink} to="/" exact className={styles.brand}>
          <img
            src="/th-103304673.jpg" 
            width="50"
            height="50"
            className={`d-inline-block align-top ${styles.brandImg}`} 
            alt=""
          />
          {' '}
          Библиотека
        </Nav.Link>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/Achivment" activeClassName="active" className={styles.navLink}>
            Каталог
          </Nav.Link>
          <Nav.Link as={NavLink} to="/auth" activeClassName="active" className={styles.authLink}>
            Авторизация
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Menu;
