import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import styles from './DetailTop.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const DetailTop = (props) => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState("../../../image/searchIcon.png");
  const [selectedImage , setSelectedImage] = useState();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/image?id=${props.placeInfo.id}`, {
          responseType: 'blob'
        });
        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
    fetchImage();
  }, [])

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);
      try {
        const response = await axios.post(`http://localhost:8081/api/image?id=${props.placeInfo.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Image uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };


  return (
    <Container className={styles.datasetDetailContainer}>
      <Row className="justify-content-center">
        <Col md={10} className={styles.detailCard}>
          <Row>
            <Col md={2} className="text-center">
                <Row>
                  <Col>
                  <img src={imageSrc} className={styles.cardImg} />
                  <form>
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{display:'none'}} ref={fileInputRef}/>
                  </form>
                  </Col>
                </Row>
                <Row>
                  <Col className={styles.selectButtonCol}>
                  <Button
                    size="sm"
                    onClick={handleTextClick}
                    className={styles.selectButton}
                    variant='light'
                  >이미지 변경</Button>
                  <Button onClick={handleSubmit} size="sm" className={styles.selectButton} variant="light">등록</Button>
                  </Col>
                </Row>
            </Col>
            <Col md={10}>
              <Row className={styles.tags}>
                <Col md={2} className={styles.tag}>#Tag1</Col>
                <Col md={2} className={styles.tag}>#Tag2</Col>
                <Col md={2} className={styles.tag}>#Tag3</Col>
                <Col md={2} className={styles.tag}>#Tag4</Col>
              </Row>
              <Row className={styles.placeName}>{props.placeInfo.place_name}</Row>
              <Row className={styles.placeAddress}>
                {props.placeInfo.road_address_name}
              </Row>
              <Row className={styles.placeCategory}>
                {props.placeInfo.category_name}
              </Row>
              <Row className={styles.buttons}>
                <Col md={{span:4, offset:8}} className="d-flex justify-content-end">
                <Button variant="danger" className={styles.detailButton} as={Link} to={props.placeInfo.place_url}>자세히보기</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailTop;