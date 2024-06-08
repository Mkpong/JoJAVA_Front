import React, { useEffect, useState } from 'react';
import styles from './WriteReview.module.css';
import { Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

const WriteReview = (props) => {
  const [data, setData] = useState({
    "targetPlaceId": props.placeInfo.id,
    "title": "",
    "content": "",
    "stars": 0,
    "imgUrl": ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    };
    const placeData = {
        "address_name": props.placeInfo.address_name,
        "category_group_code": props.placeInfo.category_group_code,
        "category_group_name": props.placeInfo.category_group_name,
        "distance": props.placeInfo.distance,
        "phone": props.placeInfo.phone,
        "kakao_place_id": props.placeInfo.id,
        "place_name": props.placeInfo.place_name,
        "place_address_name": props.placeInfo.road_address_name,
        "x": props.placeInfo.x,
        "y": props.placeInfo.y,
        "rating": 0
    }
    axios.post("http://220.149.232.224:8080/api/places", placeData, config)
    .then((response) => {
      console.log(response.data);
    }).catch((error) => console.log(error));

    if(props.isModify){
      console.log(data);
      axios.put(`http://220.149.232.224:8080/api/reviews/${props.reviewId}` , data, config)
      .then((response) => {
        window.location.href = `/detail/${props.placeInfo.id}`;
      })
      .catch((error) => console.log(error))
      props.setIsModify(false);
    }
    else {
      axios.post("http://220.149.232.224:8080/api/reviews" , data, config)
      .then((response) => {
        window.location.href = `/detail/${props.placeInfo.id}`;
      })
      .catch((error) => console.log(error))
    }

    props.setActiveTab("review");
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
    };

    useEffect(() => {
      if(props.isModify){
        setData({
          ...data,
          ['title']: props.reviewContent.title,
          ['content']: props.reviewContent.content,
          ['stars']: props.reviewContent.stars
        })
      }
    }, [props.isModify])

  

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <Container className={styles.inputGroup}>
        <label className={styles.label}>
        <Row>
        <Col md={1}>
            <div className={styles.star}>평점</div>
        </Col>
        <Col md={1} className={styles.star}>
            <select
            id="stars"
            value={data.stars}
            onChange={handleChange}
            className={styles.selectInput}
            required
            >
            {[...Array(11).keys()].map((num) => (
                <option key={num / 2} value={num / 2}>
                {num / 2}
                </option>
            ))}
            </select>
        </Col>
        <Col className={styles.submitButtonCol}>
            <button type="submit" className={styles.submitButton}>
            리뷰 작성
            </button>
        </Col>
        </Row>
        </label>
      </Container>
      <Container className={styles.inputGroup}>
        <label className={styles.label}>
          <Row>
          <Col className={styles.title}>Title</Col>
          <Col md={11}>
          <Form.Control
            type="text"
            id="title"
            value={data.title}
            onChange={handleChange}
          /></Col>
          </Row>
          <Row>
            <Col className={styles.title}>Content</Col> 
          </Row>
          <Form.Control
            as="textarea"
            type="text"
            id="content"
            value={data.content}
            className={styles.textAreaInput}
            onChange={handleChange}
          />
        </label>
      </Container>
    </form>
  );
};

export default WriteReview;
