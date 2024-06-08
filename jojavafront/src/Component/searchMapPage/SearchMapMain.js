import React from "react";
import styles from "./SearchMapMain.module.css";
import { Container,Row,Col,Form,Button } from "react-bootstrap";
import { useEffect, useState } from "react";



function SearchMapMain() {
  const [searchData, setSearchData] = useState({
    "keyword": "",
    "category": ""
  })

  useEffect(() => {
    // 지도 생성
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };
  
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
  
    // 마커가 표시될 위치 배열
    const positions = [
      { lat: 37.5665, lng: 126.9780 },
      { lat: 37.5655, lng: 126.9770 },
      { lat: 37.5645, lng: 126.9760 }
      // 추가적인 마커 위치를 여기에 추가
    ];
  
    // 마커 생성 및 지도에 표시
    positions.forEach(pos => {
      const markerPosition = new window.kakao.maps.LatLng(pos.lat, pos.lng);
  
      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      });
  
      // 지도에 마커 표시
      marker.setMap(map);
    });
  }, []);

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = () => {
    console.log(searchData);
  }


    return (
        <div>
        <Container className={styles.mainContainer}>
        <Row>
            <Col>
            <div id="map" className={styles.kakaoMap}></div>
            </Col>
            <Col>
                <Row>
                <Container className={styles.searchMainContainer}>
                <Row>
                    <Col md={3}>
                        <Form.Select aria-label="Default select example" id="category" onChange={handleChange}>
                            <option value="">---</option>
                            <option value="AT4">관광명소</option>
                            <option value="CT1">문화시설</option>
                            <option value="AD5">숙박</option>
                            <option value="FD6">음식적</option>
                            <option value="CE7">카페</option>
                        </Form.Select>
                    </Col>
                    <Col md={8}>
                        <Form.Control type="text" placeholder="검색할 장소를 입력하세요!" id="keyword" onChange={handleChange} />
                    </Col>
                    <Col md={1}>
                      <Button variant="light" className={styles.button} onClick={handleSubmit}>
                        <img src="../../../image/searchIcon.png" className={styles.searchIcon}/>
                      </Button>
                    </Col>
                </Row>
                </Container>
                </Row>
            </Col>
        </Row>
        </Container>
        </div>
    );
}

export default SearchMapMain;

