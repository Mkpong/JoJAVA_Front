import React from "react";
import styles from "./SearchMapMain.module.css";
import { Container,Row,Col,Form,Button } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";

function Review(props) {
  const nickname = localStorage.getItem('nickname');
  const accessToken = localStorage.getItem('accessToken');


  useEffect(() => {
  }, [])

  return (
      <Container className="mt-3">
          <Row>
              <Col md={8} className={styles.reviewWriter}>
                  {props.review.author.name}&nbsp;(<img src="../../../image/star.png" className={styles.imageStar}></img>&nbsp;{props.review.stars}&nbsp;)
              </Col>
          </Row>
          <Row>
              <Col md={8} className={styles.title}>
                  {props.review.title}    
              </Col>
          </Row>
          <Row>
              <Col md={8} className="text-start">
                  {props.review.content}
              </Col>
          </Row>
          <Row>
              <Col md={10} className={styles.reviewDate}>{props.review.createdAt}</Col>
          </Row>
          <hr />
      </Container>
  );
}

const PlaceInfo = (props) => {
  const [info, setInfo] = useState();
  const [imageSrc, setImageSrc] = useState("../../../image/searchIcon.png");
  const [place, setPlace] = useState();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedImage , setSelectedImage] = useState();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(5);
  const [reviews, setReviews] = useState();
  const accessToken = localStorage.getItem('accessToken');
  const config = {
      headers: {
          "Authorization": `Bearer ${accessToken}`
      }
  };

    const handlePageChange = (page) => {
      setPage(page);
    }

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://220.149.232.224:8081/api/image?id=${props.place.id}`, {
          responseType: 'blob'
        });
        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
    fetchImage();
    axios.get(`http://220.149.232.224:8080/api/places/${props.place.id}`, config)
    .then((response) => {
      console.log(response.data);
      setPlace(response.data);
    }).catch((error) => console.log(error))
    axios.get(`http://220.149.232.224:8080/api/reviews/targetPlace?targetPlaceId=${props.place.id}&page=${page-1}&size=3`)
    .then((response) => {
        setReviews(response.data.content);
        setTotalCount(response.data.totalElements);
        console.log(response.data);
    }).catch((error) => setReviews(null));
  }, [page, props.place])

  const handleDetail = (item) => {
    navigate(`/detail/${item.id}`, {state: {placeInfo: item}});
  }


  return (

    <Row className={styles.tableRow}>
      <Container className={styles.tableContainer}>
      <Row className={styles.detailCard} onClick={() => handleDetail(props.place)}>
      <Col md={2} className={styles.imageCol}>
            <img src={imageSrc} className={styles.cardImg} />
      </Col>
      <Col>
      <Row className={styles.mainRow}>
        <Col md={12}>
          <Row>
            <Col >
            <img src="../../../image/star.png" className={styles.imageStar}></img>(&nbsp;{place ? <>{place.rating}</> : <>---</>}&nbsp;)
            </Col>
          </Row>
          <Row className={styles.datasetTitle}>
            <Col>
            {props.place.place_name}
            </Col>
          </Row>
          <Row className={styles.datasetInfo}>
            <Col>
              {props.place.category_name}
            </Col>
          </Row>
        </Col>
      </Row>
      </Col>
      </Row>
      {reviews && (reviews.map((item, index) => {
                return ( <Review key={index} review={item} /> );
                }))}
      <Row>
        <Col className={styles.pageCol}>
        <Pagination
            activePage={page}
            itemsCountPerPage={5}
            totalItemsCount={totalCount}
            pageRangeDisplayed={5}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={handlePageChange}
            itemClass={styles.paginationListItem}
            linkClass={styles.paginationLink}
            activeClass={styles.paginationListItemActive}
            activeLinkClass={styles.paginationLinkActive}
            itemClassFirst={styles.paginationListItemFirstChild}
            itemClassLast={styles.paginationListItemLastChild}
            linkClassHover={styles.paginationLinkHover}
            linkClassActiveHover={styles.paginationLinkActiveHover}
        />
        </Col>
    </Row>
      </Container>
    </Row>
  );
}


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

  const clickMarker = (item) => {
    setSelectedMarkerInfo(item); // 마커 클릭 시 상태 업데이트
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

          // 마커 클릭 이벤트
          window.kakao.maps.event.addListener(marker, 'click', function() {
            clickMarker(item);
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
                  <PlaceInfo place={selectedMarkerInfo} />
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

