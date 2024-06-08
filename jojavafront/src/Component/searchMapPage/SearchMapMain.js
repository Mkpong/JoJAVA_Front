import React from "react";
import styles from "./SearchMapMain.module.css";
import { Container,Row,Col,Form,Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";


function SearchMapMain() {
  const [searchData, setSearchData] = useState({
    "keyword": "",
    "category": ""
  })

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null); // 마커 정보를 저장할 상태


  useEffect(() => {
    // 지도 생성
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 지도의 중심좌표
      level: 5 // 지도의 확대 레벨
    };
  
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    setMap(map);
  }, []);

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.id]: e.target.value
    })
  }

  const clickMarker = (markerInfo) => {
    setSelectedMarkerInfo(markerInfo); // 마커 클릭 시 상태 업데이트
  };

  const handleSubmit = () => {
        // API URL. 실제 URL로 대체해야 합니다.
        const apiUrl = `https://dapi.kakao.com/v2/local/search/keyword.json`;

        axios.get(apiUrl, {
            headers: {"Authorization": 'KakaoAK c61d346c1a792192d7f3d3c7afa97797'},
            params: {
              query: searchData.keyword,
              category_group_code: searchData.category,
            }
        }).then((response) => {
          console.log(response);
        // 검색 결과 데이터
        const searchResults = response.data.documents;

        // 이전 마커 제거
        markers.forEach((marker) => marker.setMap(null));

        // 새로운 마커 저장 배열
        const newMarkers = [];

        searchResults.forEach((item) => {
          const markerPosition = new window.kakao.maps.LatLng(
            parseFloat(item.y),
            parseFloat(item.x)
          );

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            clickable: true
          });

          const markerInfo = {
            addressName: item.address_name,
            categoryName: item.category_name,
            categoryGroupCode: item.category_group_code,
            categoryGroupName: item.category_group_name,
            placeName : item.place_name,
            x: item.x,
            y: item.y
          }

          // 마커 클릭 이벤트
          window.kakao.maps.event.addListener(marker, 'click', function() {
            clickMarker(markerInfo);
          });

          // 마커를 지도에 표시
          marker.setMap(map);

          // 새로운 마커 배열에 추가
          newMarkers.push(marker);
        });

        // 마커 배열 상태 업데이트
        setMarkers(newMarkers);

        if (searchResults.length > 0) {
          // 검색된 첫 번째 위치로 지도 중심 이동
          const centerPosition = new window.kakao.maps.LatLng(
            parseFloat(searchResults[0].y),
            parseFloat(searchResults[0].x)
          );
          map.setCenter(centerPosition);
        }
      })
      .catch((error) => console.log(error))
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
                {/* 마커 정보 표시 */}
              <Container className={styles.markerInfoContainer}>
                {selectedMarkerInfo ? (
                  <div className={styles.markerInfo}>
                    <h4>마커 정보</h4>
                    <p><strong>장소명:</strong> {selectedMarkerInfo.placeName}</p>
                    <p><strong>주소:</strong> {selectedMarkerInfo.addressName}</p>
                    <p><strong>카테고리:</strong> {selectedMarkerInfo.categoryName}</p>
                    <p><strong>카테고리 그룹명:</strong> {selectedMarkerInfo.categoryGroupName}</p>
                    <p><strong>좌표:</strong> {selectedMarkerInfo.x}, {selectedMarkerInfo.y}</p>
                  </div>
                ) : (
                  <p>마커를 클릭하여 정보를 확인하세요.</p>
                )}
              </Container>
                </Row>
            </Col>
        </Row>
        </Container>
        </div>
    );
}

export default SearchMapMain;

