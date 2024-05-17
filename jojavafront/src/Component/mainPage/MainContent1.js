import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import styles from './MainContent1.module.css';

function MainContent1() {

    const Top5Place = [
        { place: '경복궁', source: '../../../image/top1.png' },
        { place: 'N서울타워', source: '../../../image/top2.png' },
        { place: '경주랜드', source: '../../../image/top3.png' },
        { place: '에버랜드', source: '../../../image/top4.png' },
        { place: '일산 호수공원', source: '../../../image/top5.png' },
        { place: '인사동', source: '../../../image/top6.png' },
      ];

    return (
        <Container>
            <Row className={styles.title}>
                실시간 핫플레이스(국내)
            </Row>
            <Row>
        {Top5Place.map((item, index) => (
            <>
            <Col lg={2}>
            <Card key={index} className={styles.card}>
            <Card.Img variant="top" src={item.source} className={styles.cardImage}/>
            <Card.Body>
                <Card.Text>{item.place}</Card.Text>
            </Card.Body>
            </Card>
            </Col>
            </>
        ))}
            </Row>
        </Container>
    );
}

export default MainContent1;