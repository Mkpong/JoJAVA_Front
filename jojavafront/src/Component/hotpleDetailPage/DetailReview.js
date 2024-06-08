import React, { useEffect, useState } from "react";
import styles from './DetailReview.module.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Pagination from "react-js-pagination";



function Review(props) {
    const nickname = localStorage.getItem('nickname');
    const accessToken = localStorage.getItem('accessToken');


    useEffect(() => {
    }, [])

    const handleModify = () => {
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        };
        axios.get(`http://220.149.232.224:8080/api/reviews/${props.review.id}`, config)
        .then((response) => {
            props.setReviewContent({
                ['title']: props.review.title,
                ['content']: props.review.content,
                ['stars']: props.review.stars
            });
            props.setIsModify(true);
            props.setActiveTab('write');
            props.setReviewId(props.review.id);
        }).catch((error) => console.log(error));
    }

    const handleDelete = () => {
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        };
        axios.delete(`http://220.149.232.224:8080/api/reviews/${props.review.id}`, config)
        .then((response) => {
            window.location.reload();
        }).catch((error) => console.log(error));
    }


    return (
        <Container className="mt-3">
            <Row>
                <Col md={8} className={styles.reviewWriter}>
                    {props.review.author.name}&nbsp;(<img src="../../../image/star.png" className={styles.imageStar}></img>&nbsp;{props.review.stars}&nbsp;)
                </Col>
                {nickname === props.review.author.name && (
                    <Col className="d-flex justify-content-end">
                    <Button variant="light" className={styles.modifyButton} onClick={handleModify}>수정</Button>
                    <Button variant="danger" className={styles.deleteButton} onClick={handleDelete}>삭제</Button>
                    </Col>
                )}
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
            {/* 아래 버튼은 작성자만 나타나게 */}
            <Row>
                <Col md={4} className={styles.reviewDate}>{props.review.createdAt}</Col>
            </Row>
            <hr />
        </Container>
    );
}

function DetailReview(props) {
    const [reviews, setReviews] = useState();
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(5);
    const [reviewId, setReviewId] = useState("");
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
        axios.get(`http://220.149.232.224:8080/api/reviews/targetPlace?targetPlaceId=${props.placeInfo.id}&page=${page-1}&size=5`)
        .then((response) => {
            setReviews(response.data.content);
            setTotalCount(response.data.totalElements);
            console.log(response.data);
        }).catch((error) => console.log(error));

    }, [page])

    return (
        <div>
            {reviews ? (reviews.map((item, index) => {
                return ( <Review key={index} review={item} setReviewContent={props.setReviewContent} setActiveTab={props.setActiveTab} setIsModify={props.setIsModify} setReviewId={props.setReviewId} /> );
            })) : (<div className={styles.notReview}>리뷰가 존재하지 않습니다</div>)}
            {reviews && (
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
            )}
        </div>
    );
}


export default DetailReview;