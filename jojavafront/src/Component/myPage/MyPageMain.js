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
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [info, setInfo] = useState();
  const navigate = useNavigate();


  useEffect(() => {
    // 지도 생성
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 지도의 중심좌표
      level: 12 // 지도의 확대 레벨
    };
  
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    setMap(map);
  }, []);

  const apiUrl = "http://220.149.232.224:8080/api/users/my-reviews";

  axios.get(apiUrl, config, {
      params: {
        page: 0,
        size: 500
      }
  }).then((response) => {
    console.log(response);

    const contents = response.data.content;

    contents.map((review) => {
      const markerPosition = new window.kakao.maps.LatLng(
        parseFloat(review.targetPlace.y),
        parseFloat(review.targetPlace.x)
      );

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        clickable: true
      });

      // 마커에 표시할 인포윈도우를 생성합니다 
      var infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">${review.targetPlace.place_name}</div>`
      });

      window.kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
      window.kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, 'click', function() {
        clickMarker(review.targetPlace.kakaoPlaceId);
      });

      marker.setMap(map);
    });
  }).catch((error) => console.log(error));

  // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
  function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
  }

  // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
  function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
  }

  const clickMarker = (kakaoPlaceId) => {
    console.log(kakaoPlaceId);
  }

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
        <div id="map" className={styles.kakaoMap}></div>
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
