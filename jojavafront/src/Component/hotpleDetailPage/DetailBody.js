import React from "react";
import styles from './DetailBody.module.css';
import { Container,Row,Col,Tabs,Tab,Form,Button } from "react-bootstrap";
import { useState } from "react";
import DetailReview from "./DetailReview";
import WriteReview from "./WriteReview";

function DetailBody(props) {

    const [activeTab, setActiveTab] = useState('review');
    const [reviewContent, setReviewContent] = useState({
        "title": "",
        "content": "",
        "start": "0"
    });
    const [isModify , setIsModify] = useState(false);
    const [reviewId, setReviewId] = useState("");

      
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
                            <DetailReview placeInfo={props.placeInfo} setReviewContent={setReviewContent} setActiveTab={setActiveTab} setIsModify={setIsModify} setReviewId={setReviewId} />
                        </Tab>
                        <Tab eventKey="write" title="Review 작성" className="mt-2">
                            <WriteReview placeInfo={props.placeInfo} setActiveTab={setActiveTab} reviewContent={reviewContent} isModify={isModify} setIsModify={setIsModify} reviewId={reviewId} />
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