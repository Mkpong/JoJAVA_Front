import React, { useEffect, useState } from "react";
import styles from './DetailReview.module.css';
import { Container, Row, Col, Button } from "react-bootstrap";



function Review(props) {
    const nickname = localStorage.getItem('nickname');

    return (
        <Container className="mt-3">
            <Row>
                <Col md={8} className={styles.reviewWriter}>
                    {props.review.author.email}({props.review.start})
                </Col>
            </Row>
            <Row>
                <Col md={8} className="text-start">
                    {props.review.content}
                </Col>
            </Row>
            {/* 아래 버튼은 작성자만 나타나게 */}
            <Row>
                <Col md={4} className={styles.reviewDate}>{props.review.author.createdAt}</Col>
                <Col md={{span:1, offset:6}} className="d-flex justify-content-end">
                    <Button variant="light" className={styles.downloadButton}>수정</Button>
                </Col>
                <Col md={1} className="d-flex justify-content-start">
                    <Button variant="danger" className={styles.downloadButton}>삭제</Button>
                </Col>
            </Row>
            <hr />
        </Container>
    );
}

function DetailReview() {
    const [reviews, setReviews] = useState();

    useEffect(() => {
        // 리뷰 데이터 불러오기
    }, [])

    return (
        <div>
            {reviews ? reviews.map((item, index) => {
                <Review review={item} />
            }) : (<div>리뷰없다</div>)}
            
        </div>
    );
}


export default DetailReview;