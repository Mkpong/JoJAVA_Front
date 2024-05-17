import React from "react";
import { Container,Row,Col,Card } from "react-bootstrap";
import styles from './MainContent2.module.css'

function MainContent2() {
    const JapanTopPlace = [
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
                실시간 핫플레이스(해외)
            </Row>
            <Row>
        {JapanTopPlace.map((item, index) => (
            <Col lg={2}>
            <Card key={index} className={styles.card}>
            <Card.Img variant="top" src={item.source} className={styles.cardImage}/>
            <Card.Body>
                <Card.Text>{item.place}</Card.Text>
            </Card.Body>
            </Card>
            </Col>
        ))}
            </Row>
        </Container>
    );
}

export default MainContent2;