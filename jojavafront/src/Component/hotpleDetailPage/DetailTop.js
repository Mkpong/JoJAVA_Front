import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import styles from './DetailTop.module.css'
import { Link, useNavigate } from 'react-router-dom';

const DetailTop = (props) => {
  const navigate = useNavigate();

  return (
    <Container className={styles.datasetDetailContainer}>
      <Row className="justify-content-center">
        <Col md={10} className={styles.detailCard}>
          <Row>
            <Col md={2} className="text-center">
                <img src="../../../image/searchIcon.png" className={styles.cardImg} />
            </Col>
            <Col md={10}>
              <Row className={styles.tags}>
                <Col md={2} className={styles.tag}>#Tag1</Col>
                <Col md={2} className={styles.tag}>#Tag2</Col>
                <Col md={2} className={styles.tag}>#Tag3</Col>
                <Col md={2} className={styles.tag}>#Tag4</Col>
              </Row>
              <Row className={styles.placeName}>{props.placeInfo.place_name}</Row>
              <Row className={styles.placeAddress}>
                {props.placeInfo.road_address_name}
              </Row>
              <Row className={styles.placeCategory}>
                {props.placeInfo.category_name}
              </Row>
              <Row className={styles.buttons}>
                <Col md={{span:4, offset:8}} className="d-flex justify-content-end">
                <Button variant="danger" className={styles.detailButton} as={Link} to={props.placeInfo.place_url}>자세히보기</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailTop;