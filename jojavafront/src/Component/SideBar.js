import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import styles from './SideBar.module.css';

function SideBar() {
  return (
    <Container fluid className="sidebar-container">
      <Row>
        <Col md={12}>
          <Nav className="flex-column">
            <Nav.Item className={styles.mainMenu}>
              Hotple
            </Nav.Item>
            <hr />
            <Nav.Item>
              <Nav.Link href="/search">Search</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/search/map">Map</Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles.mainMenu}>
              AI Train
            </Nav.Item>
            <hr />
            <Nav.Item>
              <Nav.Link href="/search">Train Model</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/search">Test Model</Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles.mainMenu}>
              My Page
            </Nav.Item>
            <hr />
            <Nav.Item>
              <Nav.Link href="/search">myPage</Nav.Link>
            </Nav.Item>   
            <Nav.Item>
              <Nav.Link href="/search">myPlace</Nav.Link>
            </Nav.Item>              
          </Nav>
        </Col>
      </Row>
    </Container>
  );
}

export default SideBar;