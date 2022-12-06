import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loginUser from '../../../_actions/user_action.js';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailHandler = e => {
    setEmail(e.target.value);
  }

  const onPasswordHandler = e => {
    setPassword(e.target.value);
  }

  const onSubmitHandler = e => {
    e.preventDefault();
    let body = { email, password };
    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess) {
          navigate('/');
        } else {
          alert('Error');
        }
      });
    
    //axios.post('/api/users/login', body)
    //  .then(response => {
    // });   
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh'
    }}>
      <form action="" style={{display: 'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}
      >
        <label htmlFor="">Email</label>
        <input type="email" value={email} onChange={onEmailHandler}/>
        <label htmlFor="">Password</label>
        <input type="password" value={password} onChange={onPasswordHandler}/>
        <br/>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage;