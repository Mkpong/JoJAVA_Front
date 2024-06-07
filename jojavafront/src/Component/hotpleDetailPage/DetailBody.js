import React from "react";
import styles from './DetailBody.module.css';
import { Container,Row,Col,Tabs,Tab,Form,Button } from "react-bootstrap";
import { useState } from "react";
import DetailReview from "./DetailReview";
import WriteReview from "./WriteReview";

function DetailBody(props) {

    const [activeTab, setActiveTab] = useState('review');

      
    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
    };

    return(
        <div>
            <Container>
                <Row className='mt-3'>
                    <Col md={{ span: 10, offset: 1 }}>
                    <Row>
                        <Tabs
                        id="controlled-tab-example"
                        activeKey={activeTab}
                        onSelect={(k) => handleTabChange(k)}
                        >
                        <Tab eventKey="review" title="Review" className='mt-2'>
                            <DetailReview placeInfo={props.placeInfo} />
                        </Tab>
                        <Tab eventKey="write" title="Review 작성" className="mt-2">
                            <WriteReview placeInfo={props.placeInfo} setActiveTab={setActiveTab} />
                        </Tab>
                        </Tabs>
                    </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DetailBody;