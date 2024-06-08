import React from "react";
import styles from "./SearchMain.module.css";
import { Container,Row,Col,Form,Button,ButtonGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";

function SearchMain() {

    const [selectedValue, setSelectedValue] = useState();
    const [searchText , setSearchText] = useState("");
    const [tableValue, setTableValue] = useState();
    const [metadata, setMetadata] = useState();
    const [page, setPage] = useState(1);
    const [totalCount , setTotalCount] = useState(0);
    const [isHeart, setIsHeart] = useState(false);
    const [userHearts , setUserHearts] = useState([]);

    const navigate = useNavigate();

    const handlePageChange = (page) => {
        setPage(page);
    }

    useEffect(() => {
        searchHandle();
        // 유저의 하트 정보 가져오기
        // axios.get..
        // setUserHearts(response)...
      }, [page]); // 의존성 배열

    const checkboxItems = [
        { id: 'AT4', label: '관광명소' },
        { id: 'CT1', label: '문화시설' },
        { id: 'AD5', label: '숙박' },
        { id: 'FD6', label: '음식점' },
        { id: 'CE7', label: '카페' },
    ];


    const handleChange = (event) => {
        const { id, checked } = event.target;
        setSelectedValue(checked ? id : null);
    };

    const searchHandle = () => {
        console.log(selectedValue);
        axios.get("https://dapi.kakao.com/v2/local/search/keyword.json", {
            headers: {"Authorization": 'KakaoAK c61d346c1a792192d7f3d3c7afa97797'},
            params: {
                query: searchText,
                category_group_code: selectedValue,
                size: 7,
                page: page
            }
        }).then((response) => {
            setTableValue(response.data.documents);
            setTotalCount(response.data.meta.pageable_count);
            console.log(response.data);
        })
        .catch((error) => console.log(error))
    }

    const handleDetail = (item) => {
        navigate(`/detail/${item.id}`, {state: {placeInfo: item}});
    }

    const handleAddHeart = () => {
        // 유저 하트 정보에 추가
    }

    const handleDeleteHeart = () => {
        // 유저 하트 정보에서 해당 값 삭제
    }
      
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
                    <Button as={Link} to="/search/map" variant="primary" className={styles.viewMapButton}>지도로 보기</Button>
                </Col>
            </Row>
            <Row className={styles.searchboxRow}>
            <Col lg={9}>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="검색어를 입력하세요" onChange={(e) => setSearchText(e.target.value)}/>
                </Form.Group>
            </Form>
            </Col>
            <Col lg={3}>
                <Button variant="light" onClick={searchHandle}>
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
                        checked={selectedValue === item.id}
                        onChange={handleChange}
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
            </Col>
            <Col>
                    <Row>
                        <Col className={styles.resultTitle}>
                            검색 결과
                        </Col>
                    </Row>
                    <hr />
                    {tableValue && tableValue.map((item, index) => (
                        <Row className={styles.tableRow}>
                            <Container className={styles.tableContainer}>
                            <Row>
                                <Col className={styles.detailCard}>
                                <Row>
                                    <Col md={12}>
                                    <Row className={styles.datasetTitle}>
                                        {item.place_name}
                                        <Col md = {2} className={styles.detailButton}>
                                            <Button
                                            onClick={() => handleDetail(item)}
                                            variant="light"
                                            size='sm'
                                            >자세히보기</Button>
                                        </Col>
                                        <Col className={styles.heartImageCol}>
                                        {userHearts.includes(item.id) ? <img src="../../../image/heart_fuild.png" className={styles.imageHeart} onClick={() => handleDeleteHeart()}></img>
                                        : <img src="../../../image/heart_empty.png" className={styles.imageHeart} onClick={() => handleAddHeart()}></img>}
                                        </Col>
                                    </Row>
                                    <Row className={styles.datasetInfo}>
                                        {item.address_name}
                                    </Row>
                                    </Col>
                                </Row>
                                </Col>
                            </Row>
                            </Container>
                        </Row>
                    ))}
                    {tableValue && (
                    <Row>
                        <Col className={styles.pageCol}>
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={7}
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
                    )}


            </Col>
        </Row>
        </Container>
        </div>
    );
}

export default SearchMain;