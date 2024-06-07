import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import styles from './DetailMain.module.css';
import DetailTop from "./DetailTop";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import DetailReview from "./DetailReview";
import DetailBody from "./DetailBody";

function DetailMain() {
    const { id } = useParams(); // URL에서 id 매개변수를 가져옵니다.
    const location = useLocation();

    useEffect(() => {
        if(location.state){
            console.log(location.state.placeInfo);
        }
    }, [])

    return (
        <Container className="mt-4">
            <DetailTop placeInfo={location.state.placeInfo} />
            <DetailBody placeInfo={location.state.placeInfo} />
        </Container>
    );
}

export default DetailMain;