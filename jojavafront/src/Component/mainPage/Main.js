import React from "react";
import MainTop from "./MainTop";
import MainEvent from "./MainEvent";
import { Container } from "react-bootstrap";
import styles from './Main.module.css';
import MainContent1 from "./MainContent1";

function Main() {
    return(
        <div>
        <MainTop></MainTop>
        <Container className={styles.mainContainer}>
            <MainEvent />
            <MainContent1 />
        </Container>
        </div>
    );
}

export default Main;