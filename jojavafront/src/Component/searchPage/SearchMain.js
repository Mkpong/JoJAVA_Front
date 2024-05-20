import React from "react";
import styles from "./SearchMain.module.css";
import { Container,Row,Col,Form,Button,ButtonGroup } from "react-bootstrap";
import { useState } from "react";



function SearchMain() {

    const checkboxItems = [
        { id: 'AT4', label: '관광명소' },
        { id: 'CT1', label: '문화시설' },
        { id: 'AD5', label: '숙박' },
        { id: 'FD6', label: '음식점' },
        { id: 'CE7', label: '카페' },
      ];

      


    return (
        <div>
        <Container className={styles.mainContainer}>
        <Row>
            <Col lg={3} className={styles.searchboxCol}>
            <Row className={styles.searchboxTitleRow}>
                <Col md={{ span: 8, offset: 2 }}>검색어/카테고리 검색</Col>
            </Row>
            <Row>
                <Col className={styles.viewMap} md={{ span: 10, offset: 1 }}>
                    <Button variant="primary" className={styles.viewMapButton}>지도로 보기</Button>
                </Col>
            </Row>
            <Row className={styles.searchboxRow}>
            <Col lg={9}>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="검색어를 입력하세요" />
                </Form.Group>
            </Form>
            </Col>
            <Col lg={3}>
                <Button variant="light">
                    검색
                </Button>
            </Col>
            </Row>
            <hr />
            <Row>               
                <Col md={{ span: 4, offset: 4 }}>
                    <div className={styles.categoryDiv}>카테고리</div>
                    <Form>
                    {checkboxItems.map((item) => (
                        <Form.Check 
                        key={item.id}
                        type="checkbox"
                        id={item.id}
                        label={item.label}
                        className={styles.categoryCheckbox}
                        />
                    ))}
                    </Form>
                </Col>
            </Row>
            <hr />
            <Row className={styles.regionRow}>        
                <Col md={{ span: 8, offset: 2 }}>
                    <div className={styles.categoryDiv}>지역</div>

                    <Form.Select aria-label="Default select example" className={styles.regionSelect}>
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

                    <Form.Select aria-label="Default select example" className={styles.regionSelect}>
                        <option>---</option>
                        <option value="1">부천시</option>
                    </Form.Select>
                </Col>
            </Row>
            <hr />
            <Row className={styles.regionRow}>
                <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <div className={styles.categoryDiv}>#태그</div>
                </Col>
                </Row>
                <Row className={styles.tagRow}>
                    
                </Row>
            </Row>
            </Col>
        </Row>
        </Container>
        </div>
    );
}

export default SearchMain;