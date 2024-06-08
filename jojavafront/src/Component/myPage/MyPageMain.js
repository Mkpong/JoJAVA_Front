// MyPageMain.js

import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styles from './MyPageMain.module.css';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const accessToken = localStorage.getItem('accessToken');
const config = {
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
};

const MyReview = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [review, setReview] = useState();

  const handleReview = () => {
    if(isActive){
      setIsActive(!isActive);
    }else {
      setIsActive(!isActive);
    }
  }

  return (
    <Row className={styles.buttonRow}>
    <Col>
        <Button variant='none' className={styles.infoButton} onClick={handleReview}>
            <div className="d-flex justify-content-between align-items-center">
                <span>장소 이름</span>
                <img src='../../../image/downButton.png'  className={styles.downButton} />
            </div>
            {isActive && <>
                <Row><Col className={styles.reviewTitleCol}>조건부 스타일링</Col></Row>
                <Row><Col className={styles.reviewContentCol}>
                위 예제에서는 배열에 특정 값이 있는지 여부에 따라 텍스트 색상을 다르게 적용합니다. 이처럼 삼항 연산자는 조건부 렌더링뿐만 아니라 조건부 스타일링에도 유용하게 사용될 수 있습니다.
                위 예제에서는 배열에 특정 값이 있는지 여부에 따라 텍스트 색상을 다르게 적용합니다. 이처럼 삼항 연산자는 조건부 렌더링뿐만 아니라 조건부 스타일링에도 유용하게 사용될 수 있습니다.
                위 예제에서는 배열에 특정 값이 있는지 여부에 따라 텍스트 색상을 다르게 적용합니다. 이처럼 삼항 연산자는 조건부 렌더링뿐만 아니라 조건부 스타일링에도 유용하게 사용될 수 있습니다.
                위 예제에서는 배열에 특정 값이 있는지 여부에 따라 텍스트 색상을 다르게 적용합니다. 이처럼 삼항 연산자는 조건부 렌더링뿐만 아니라 조건부 스타일링에도 유용하게 사용될 수 있습니다.
                
                </Col></Row>
            </>}
        </Button>
    </Col>
    </Row>
  );
}

const MyHeart = (props) => {
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://220.149.232.224:8080/api/places/${props.id}`, config)
    .then((response) => {
      setInfo(response.data)
      setInfo({
        ...response.data,
        ['id']: response.data.kakaoPlaceId
      })
    }).catch((error) => console.log(error));
  }, [])

  const handleDetail = (item) => {
    navigate(`/detail/${item.id}`, {state: {placeInfo: item}});
  }

  return (
    <>
    {info && 
    <Row className={styles.tableRow}>
      <Container className={styles.tableContainer}>
      <Row>
          <Col className={styles.detailCard}>
          <Row>
              <Col md={12}>
              <Row className={styles.datasetTitle}>
                  {info.place_name}
                  <Col md = {4} className={styles.detailButton}>
                      <Button
                      variant="light"
                      size='sm'
                      onClick={() => handleDetail(info)}
                      >자세히보기</Button>
                  </Col>
              </Row>
              <Row className={styles.datasetInfo}>
                  {info.address_name}
              </Row>
              </Col>
          </Row>
          </Col>
      </Row>
      </Container>
    </Row>
    }</>
  );
}

const MyPageMain = () => {

  const [heartPlace, setHeartPlace] = useState();
  const [reviewPlace, setReviewPlace] = useState();

  useEffect(() => {
    axios.get("http://220.149.232.224:8080/api/users/current", config)
    .then((response) => {
        if(response.data.favorite_places !== null){
            setHeartPlace(response.data.favorite_places);
        }
        console.log(response.data.favorite_places);
    })
    .catch((error) => console.log(error))
  }, [])

  return (
    <Container className={styles.container}>
      <Row>
        <Col md={6}>
          <Card className={styles.card}>
            <Card.Body>
              <h2>찜 목록</h2>
              {heartPlace && heartPlace.map((item, key) => (
                <MyHeart id={item}/>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className={styles.card}>
            <Card.Body>
              <h2>내가 다녀왔던 곳</h2>
              <MyReview />
              {reviewPlace && reviewPlace.map((item, key) => (
                <MyReview id={item} />
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyPageMain;
