import React from "react";
import styles from './MainTop.module.css';
import { Container,Row,Col,Tabs,Tab,Form,Button } from "react-bootstrap";
import { useState } from "react";

function MainTop() {

    const [activeTab, setActiveTab] = useState('tab1');

      
    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
    };

    return(
        <div>
            <Container fluid className={styles.containerMain}>
                <Row >
                    <Col className={styles.maintext}>어디로 떠나실 예정이신가요?</Col>
                </Row>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                    <Container className={styles.containerSub}>
                        <Tabs
                        id="controlled-tab-example"
                        activeKey={activeTab}
                        onSelect={(k) => handleTabChange(k)}
                        >
                        <Tab eventKey="tab1" title="국내 여행지">
                            <Row className={styles.inputForm}>
                                <Col lg={3}>
                                    <Form.Select aria-label="Default select example">
                                        <option>---</option>
                                        <option value="1">경기도</option>
                                        <option value="2">강원도</option>
                                        <option value="3">충청북도</option>
                                        <option value="4">충청남도</option>
                                        <option value="5">전라북도</option>
                                        <option value="6">전라남도</option>
                                        <option value="7">경상북도</option>
                                        <option value="8">경상남도</option>
                                        <option value="9">서울광역시</option>
                                        <option value="10">울산광역시</option>
                                        <option value="11">광주광역시</option>
                                        <option value="12">인천광역시</option>
                                        <option value="13">부산광역시</option>
                                        <option value="14">대구광역시</option>
                                        <option value="15">대전광역시</option>
                                    </Form.Select>
                                </Col>
                                <Col lg={3}>
                                    <Form.Select aria-label="Default select example">
                                        <option>---</option>
                                        <option value="1">부천시</option>
                                    </Form.Select>
                                </Col>
                                <Col lg={5}>
                                    <Form.Control type="email" placeholder="장소이름 또는 카테고리를 입력하세요!" />
                                </Col>
                                <Col>
                                <Button variant="light">
                                    <img src="../../../image/searchIcon.png" className={styles.serachIcon}/>
                                </Button>
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="tab2" title="해외 여행지">
                            <Row className={styles.inputForm}>
                                <Col lg={3}>
                                    <Form.Select aria-label="Default select example">
                                        <option>---</option>
                                        <option value="1">미국</option>
                                        <option value="2">일본</option>
                                        <option value="3">대만</option>
                                    </Form.Select>
                                </Col>
                                <Col lg={8}>
                                    <Form.Control type="email" placeholder="장소이름 또는 카테고리를 입력하세요!" />
                                </Col>
                                <Col lg={1}>
                                <Button variant="light">
                                    <img src="../../../image/searchIcon.png" className={styles.serachIcon}/>
                                </Button>
                                </Col>
                            </Row>
                        </Tab>
                        </Tabs>
                    </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default MainTop;