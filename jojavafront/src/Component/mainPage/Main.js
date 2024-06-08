import React from "react";
import MainTop from "./MainTop";
import MainEvent from "./MainEvent";
import { Container } from "react-bootstrap";
import styles from './Main.module.css';
import MainContent1 from "./MainContent1";
import MainContent2 from "./MainContent2";
import MainKorea from "./MainKorea";

function Main() {
    return(
        <div>
        <MainTop></MainTop>
        <Container className={styles.mainContainer}>
            <MainEvent />
            <MainContent1 />
            {/* <MainContent2 /> */}
            <MainKorea />
        </Container>
        </div>
    );
}

export default Main;