import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response.data));
  }, []);

  const onClickHandler = () => {
    axios.get(`/api/users/logout`)
      .then(resposne => {
        if(resposne.data.success) {
          navigate('/login');
        } else {
          alert('로그아웃 하는데 실패했습니다.');
        }
      });
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh'
      }}>
      <h1>시작 페이지</h1>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  )
}

export default LandingPage;