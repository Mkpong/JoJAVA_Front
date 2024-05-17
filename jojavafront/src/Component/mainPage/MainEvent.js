import React from "react";
import { Container,Row, Col } from "react-bootstrap";
import { useState } from "react";
import styles from './MainEvent.module.css';

const eventsData = [
    { title: 'Event 1', source: '../../../image/event1.png' },
    { title: 'Event 2', source: '../../../image/event2.png' },
    { title: 'Event 3', source: '../../../image/event1.png' },
    { title: 'Event 4', source: '../../../image/event1.png' },
    { title: 'Event 5', source: '../../../image/event1.png' },
  ];

function MainEvent() {
    const [activeEventIndex, setActiveEventIndex] = useState(0);

    const goToPreviousEvent = () => {
      setActiveEventIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };
  
    const goToNextEvent = () => {
      setActiveEventIndex((prevIndex) => Math.min(prevIndex + 1, eventsData.length - 1));
    };
    const currentEvent = eventsData[activeEventIndex];

    return (
        <Container>
          <Row className={styles.title}>
              진행중인 이벤트
          </Row>
        <div className={styles.eventContainer}>
        <Row>
        <div className={styles.event}>
            <img src={currentEvent.source} className={styles.eventBanner} />
        </div>
        </Row>
        <Row>
        <div className={styles.dots}>
            {eventsData.map((_, index) => (
            <span
                key={index}
                className={index === activeEventIndex ? styles.dotActive : styles.dot}
                // className={styles.dot}
                onClick={() => setActiveEventIndex(index)}
            />
            ))}
        </div>
        </Row>
        </div>
        </Container>
    );
}

export default MainEvent;