import React, { useEffect } from "react";
import axios from 'axios';
import { Nav, Container, Navbar, Button, NavDropdown, Dropdown} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from './NavBar.module.css';
import { useState } from "react";
import SideBar from "./SideBar";

const SocialKakao = (event) =>
  {
    const REST_API_KEY = 'ef92d61b4d51ea46edb0329a33e3f5cc';
    const REDIRECT_URI = 'http://localhost:3000/kakao-login';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = link;
  }

function NavBar({toggleSidebar}){

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        setIsLogin(true);
        const accessToken = localStorage.getItem('accessToken');

        const getUserInfo = async () => {
          try {
            const response = await fetch(`http://220.149.232.224:8080/api/users/current`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
            });
            console.log(response);
            const data = await response.json();
            localStorage.setItem('nickname', data.name);
            console.log(data);
            if (response.ok) {
              console.log('User Info:', data);
            } else {
            console.error('Failed to fetch access token:', data);
            }
          } catch (error) {
            console.error('Error fetching access token:', error);
          }
        }
        getUserInfo();
        };
    }, []);

    return(
      <Container fluid style={{maxWidth: '1300px'}} className='mb-2'>
      <Navbar bg="light" expand="lg" className={styles.navbar}>
        <Navbar.Brand href="/" className={styles.logo}>
          <img src="../../image/mainlogo.png" className={styles.mainImage} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Nav>
            {isLogin ? (
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  안녕하세요! {localStorage.getItem('nickname')} 님!
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/mypage">마이페이지</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/logout">로그아웃</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button as={Link} onClick={SocialKakao} variant="light" className={styles.button1}>로그인/회원가입</Button>
            )}
          </Nav>
          <Button variant="light" onClick={toggleSidebar}>
              <img src="../../image/dropdown.png" alt="Dropdown Image" className={styles.dropdownImage}/> {/* 이미지 */}
          </Button>
        </Navbar.Collapse>

    </Navbar>
    </Container>
  );
}

export default NavBar;