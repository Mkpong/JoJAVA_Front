// MyPageMain.js

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from './MyPageMain.module.css';

const MyPageMain = () => {
  return (
    <Container className={styles.container}>
      <Row>
        <Col md={6}>
          <Card className={styles.card}>
            <Card.Body>
              <h2>찜 목록</h2>
              <p>여기에 사용자의 정보를 표시하세요.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className={styles.card}>
            <Card.Body>
              <h2>내가 다녀왔던 곳</h2>
              <p>여기에 사용자의 주문 내역을 표시하세요.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyPageMain;
