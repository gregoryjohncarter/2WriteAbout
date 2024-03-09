import React, { useState } from 'react';

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const LoginForm = ({ openModal, setOpenModal, setLoginStatus, loginStatus }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [inputLogin, setInputLogin] = useState({email:'', password:''});
  const handleLogin = async (input) => {
    setInputLogin({email:'', password:''});
    if (input.email.length < 4 || input.password.length < 4) {
      return
    }
    let email = input.email;
    let password = input.password;

    if (input.email.length > 4 && input.password.length > 4) {
      const response = await fetch('/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      // check the response status
      if (response.ok) {
        const json = await response.json();
        const obj = await json;
        setLoginStatus(obj.id);
        setOpenModal(false);
      } else {
        alert(response.statusText);
      }
    }
  }

  const [inputSignup, setInputSignup] = useState({username: '', email:'', password:''});
  const handleSignup = async (input) => {
    setInputSignup({username: '', email: '', password: ''});
    if (input.username.length < 4 || input.email.length < 4 || input.password.length < 4) {
      return
    }
    let username = input.username;
    let email = input.email;
    let password = input.password;

    if (input.username.length > 4 && input.email.length > 4 && input.password.length > 4) {
      const response = await fetch('/user', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      // check the response status
      if (response.ok) {
        alert("User created!");
      } else {
        alert(response.statusText);
      }
    }
  }

  const handleLogout = async () => {
    const response = await fetch(`/logout/${loginStatus}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/');
      setLoginStatus(0);
    } else {
      alert(response.statusText);
    }
  }

  return (
    <Modal
      open={openModal}
      onClose={()=>setOpenModal(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    > 
      <div className='modal-style modal-style-2 mytbl'> 
        <Box sx={{ width: '100%' }} id='modal-modal-description'>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
              <Tab label='Log in'/>
              <Tab label='Sign up'/>
            </Tabs>
          </Box>
          <div
            role='tabpanel'
            hidden={value !== 0}
            id='simple-tabpanel-0'
            aria-labelledby='simple-tab-0'
          >
            {value === 0 && (
              <Box sx={{ p: 6 }}>
                {!loginStatus ? 
                <div style={{display: 'block'}}>
                  <div>
                    <TextField
                      label='Email'
                      id='filled-size-normal-ulogin'
                      variant='filled'
                      onChange={(e)=>setInputLogin({email: e.target.value, password: inputLogin.password})}
                      value={inputLogin.email}
                    />
                  </div>
                  <div style={{marginTop: '20px'}}>
                    <TextField
                      label='Password'
                      type='password'
                      id='filled-size-normal-upw'
                      variant='filled'
                      onChange={(e)=>setInputLogin({email: inputLogin.email, password: e.target.value})}
                      value={inputLogin.password}
                    />
                  </div>
                  <Button style={{marginTop: '20px'}} onClick={()=>handleLogin(inputLogin)} color='primary' variant='outlined'>
                    Submit Log in
                  </Button>
                </div>
                 : 
                 <Button color='info' variant='outlined' onClick={()=>handleLogout()}>Log out</Button>}
              </Box>
            )}
          </div>
          <div
            role='tabpanel'
            hidden={value !== 1}
            id='simple-tabpanel-1'
            aria-labelledby='simple-tab-1'
          >
            {value === 1 && (
              <Box sx={{ p: 6 }}>
                <div style={{display: 'block'}}>
                  <div>
                    <TextField
                      label='Username'
                      id='filled-size-normal-sun'
                      variant='filled'
                      onChange={(e)=>setInputSignup({username: e.target.value, email: inputSignup.email, password: inputSignup.password})}
                      value={inputSignup.username}
                    />
                  </div>
                  <div style={{marginTop: '20px'}}>
                    <TextField
                      label='Email'
                      id='filled-size-normal-sem'
                      variant='filled'
                      onChange={(e)=>setInputSignup({username: inputSignup.username, email: e.target.value, password: inputSignup.password})}
                      value={inputSignup.email}
                    />
                  </div>
                  <div style={{marginTop: '20px'}}>
                    <TextField
                      label='Password'
                      type='password'
                      id='filled-size-normal-spw'
                      variant='filled'
                      onChange={(e)=>setInputSignup({username: inputSignup.username, email: inputSignup.email, password: e.target.value})}
                      value={inputSignup.password}
                    />
                  </div>
                  <Button style={{marginTop: '20px'}} onClick={() => handleSignup(inputSignup)} color='primary' variant='outlined'>
                    Submit Sign up
                  </Button>
                </div>
              </Box>
            )}
          </div>
        </Box>
      </div>
    </Modal>
  );
}

export default LoginForm;