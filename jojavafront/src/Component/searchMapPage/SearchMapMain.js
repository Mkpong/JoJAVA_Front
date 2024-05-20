import React from "react";
import styles from "./SearchMapMain.module.css";
import { Container,Row,Col,Form } from "react-bootstrap";



function searchMapMain() {

    return (
        <div>
        <Container className={styles.mainContainer}>
        <Row>
            <Col>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
            </Form>
            </Col>
        </Row>
        </Container>
        </div>
    );
}

export default searchMapMain;