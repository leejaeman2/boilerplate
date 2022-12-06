import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action.js';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = event => {
    setEmail(event.target.value);
  }

  const onNameHandler = event => {
    setName(event.target.value);
  }

  const onPasswordHandler = event => {
    setPassword(event.target.value);
  }

  const onConfirmPasswordHandler = event => {
    setConfirmPassword(event.target.value);
  }

  const onSubmitHandler = event => {
    event.preventDefault();

    if(password !== confirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    let body = { email, name, password };

    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success) {
          navigate('/login');
        } else {
          alert('Error~~!');
        }
      });
  }

  return (
    <div style ={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh'
    }}>
      <form action=""
        style={{display: 'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}>
        <label htmlFor="">Email</label>
        <input type="email" value={email} onChange={onEmailHandler}/>        
        <label htmlFor="">Name</label>
        <input type="text" value={name} onChange={onNameHandler}/>
        <label htmlFor="">Password</label>
        <input type="password" value={password} onChange={onPasswordHandler}/>
        <label htmlFor="">Confirm Password</label>
        <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler}/>
        <br />
        <button>
          Sign up
        </button>
      </form>
    </div>
  )
}

export default RegisterPage;
