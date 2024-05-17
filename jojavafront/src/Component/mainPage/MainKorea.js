import React from "react";
import styles from './MainKorea.module.css';
import { Container, Row, Col, Tabs, Tab, Button, Card } from "react-bootstrap";
import { useState } from "react";

function MainKorea() {
    const SeoulPlace = [
        { place: '경복궁', source: '../../../image/top1.png', type: '관광지' ,score: '4.1' },
        { place: 'N서울타워', source: '../../../image/top2.png', type: '관광지', score: '3.2'},
        { place: '경주랜드', source: '../../../image/top3.png', type: '관광지',score: '4.5' },
        { place: '에버랜드', source: '../../../image/top4.png', type: '관광지', score: '2.5' },
        { place: '일산 호수공원', source: '../../../image/top5.png', type: '관광지', score: '3.5' },
        { place: '인사동', source: '../../../image/top6.png', type: '관광지', score: '4.8' },
      ];

    const [activeTab, setActiveTab] = useState('tab1');
      
    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
    };

    return (
        <Container>
            <Row className={styles.title}>
            국내 여행지
            </Row>
            <Row>
                    <Tabs
                    id="controlled-tab-example"
                    activeKey={activeTab}
                    variant="pills"
                    onSelect={(k) => handleTabChange(k)}
                    className={styles.tabs}
                    >
                    <Tab eventKey="서울" title="서울">
                    <Row>
                    {SeoulPlace.map((item, index) => (
                        <Col lg={3} className={styles.colImage}>
                            <img src={item.source} className={styles.image}></img>
                            <Row className={styles.rowText1}>
                                {item.type}
                            </Row>
                            <Row className={styles.rowText2}>
                                {item.place}
                            </Row>
                            <Row className={styles.rowText3}>
                                <Col lg={1} className={styles.colStar}>
                                <img src="../../../image/star.png" className={styles.imageStar}></img>
                                </Col>
                                <Col lg={1} className={styles.colScore}>({item.score})</Col>
                            </Row>
                        </Col>
                    ))}
                    </Row>
                    </Tab>
                    <Tab eventKey="부산" title="부산">
                        
                    </Tab>
                    <Tab eventKey="경주" title="경주">
                        
                    </Tab>
                    <Tab eventKey="여수" title="여수">
                    
                    </Tab>
                    <Tab eventKey="속초" title="속초">
                    
                    </Tab>
                    </Tabs>
            </Row>
        </Container>
    );
}

export default MainKorea;