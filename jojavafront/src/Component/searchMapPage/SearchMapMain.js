import React from "react";
import styles from "./SearchMapMain.module.css";
import { Container,Row,Col,Form } from "react-bootstrap";
import { useEffect } from "react";



function SearchMapMain() {

    useEffect(() => {
        const container = document.getElementById('map');
        if (window.kakao && container) {
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
          };
          const map = new window.kakao.maps.Map(container, options);
        }
      }, []);

    return (
        <div>
        <Container className={styles.mainContainer}>
        <Row>
            <Col>
            <div id="map" className={styles.kakaoMap}></div>
            </Col>
            <Col>
                hello
            </Col>
        </Row>
        </Container>
        </div>
    );
}

export default SearchMapMain;