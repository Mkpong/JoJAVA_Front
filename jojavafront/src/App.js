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
import SearchMain from './Component/searchPage/SearchMain.js';
import SearchMapMain from './Component/searchMapPage/SearchMapMain.js';
import DetailMain from './Component/hotpleDetailPage/DetailMain.js';
import KakaoLogin from './Component/KakaoLoginPage/KakaoLogin.js';
import { Navigate } from 'react-router-dom';
import MyPageMain from './Component/myPage/MyPageMain.js';

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
              <Route path="/search" element={<SearchMain />} />
              <Route path="/search/map" element={<SearchMapMain />} />
              <Route path="/detail/:id" element={<DetailMain />} />
              <Route exact path='/kakao-login' element={<KakaoLogin />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/mypage" element={<MyPageMain />} />
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
