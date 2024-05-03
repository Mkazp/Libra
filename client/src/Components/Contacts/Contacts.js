import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import styles from './Contacts.module.scss';

const Contacts = () => {
  return (
    <Container fluid className="bg-dark py-4 contactsContainer">
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="mb-4 card">
            Библиотека 2024&copy; "Все права защищены"
            </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacts;
