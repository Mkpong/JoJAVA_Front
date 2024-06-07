import React, { useState } from 'react';
import styles from './WriteReview.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const WriteReview = (props) => {
  const [data, setData] = useState({
    "target": props.placeInfo.id,
    "title": "그런거없다",
    "content": "",
    "stars": "",
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
    axios.post("http://220.149.232.224:8080/api/reviews" , config, data)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error))
    setData({
        ...data,
        ['content']: "",
        ['stars']: "0"
    })
    props.setActiveTab("review");
  };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
    };

  

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <Container className={styles.inputGroup}>
        <label className={styles.label}>
        <Row>
        <Col md={1}>
            <div className={styles.star}>평점 : </div>
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
          <textarea
            id="content"
            value={data.content}
            onChange={handleChange}
            className={styles.textAreaInput}
            required
          />
        </label>
      </Container>
    </form>
  );
};

export default WriteReview;
