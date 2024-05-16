import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import BottomBar from './Component/BottomBar';
import NavBar from './Component/NavBar.js';
import SideBar from './Component/SideBar.js';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Main from './Component/mainPage/Main.js';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
      console.log("AA");
  }

  return (
    <div className="App">
      <container>
        <Row>
          <Col>
            <NavBar toggleSidebar={toggleSidebar}/>
            <Routes>
              <Route path="/" element={<Main />} />
            </Routes>
            <BottomBar />
          </Col>
            {sidebarOpen && (
            <Col lg={2}><SideBar /></Col>
            )}
        </Row>
      </container>

    </div>
  );
}

export default App;
