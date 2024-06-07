import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KakaoLogin = () => {
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");
  console.log(KAKAO_CODE);

  const navigate = useNavigate();

  const LoginProcess = () => {
    if (KAKAO_CODE) {
      FetchAccessToken(KAKAO_CODE);
    }
  }

  const FetchAccessToken = async (code) => {
    try {
      const response = await fetch(`http://220.149.232.224:8080/api/auth/kakao?code=${code}`, {
        method: 'POST'
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);

        navigate('/');
        window.location.reload();
      } else {
        console.error('Failed to fetch access token:', data);
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  return (
    <div>
      <button onClick={LoginProcess}>Kakao Login</button>
    </div>
  );
};

export default KakaoLogin;
