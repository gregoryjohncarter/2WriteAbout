import React, { useState, useEffect } from 'react';

import LoginForm from '../components/LoginForm.js';
import ItemPanel from '../components/ItemPanel.js';
import PostsBar from '../components/PostsBar.js';
import Post from '../components/Post.js';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

const Home = () => {
  const [loginStatus, setLoginStatus] = useState(0);
  const [postsList, setPostsList] = useState([]);
  const [openLogin, setOpenLogin] = useState(false);
  const [displaySelect, setDisplaySelect] = useState(false);
  const [currentPost, setCurrentPost] = useState([]);
  const [postUpdate, setPostUpdate] = useState([]);

  // useEffect(() => {
  //   if (loginStatus !== 0) {
  //     const postsRequest = async () => {
  //       const posts = await fetch(`/post/${loginStatus}`);
  //       let postsResults = await posts.json();
  //       setPostsList(postsResults);
  //     }
  //     postsRequest();
  //   } else {
  //     setPostsList([]);
  //   }
  // }, [loginStatus])

  // const [testApi, setTestApi] = useState([]);

  // const testApiFunc = async () => {
  //   try {
  //     let apiUrlFm = "http://ws.audioscrobbler.com/2.0/?method=track.search&track=asbsd%20asdf&api_key=" + process.env.REACT_APP_MYAPI + "&format=json";
  //     let headers = new Headers({
  //       "Accept"       : "application/json",
  //       "Content-Type" : "application/json",
  //       "User-Agent"   : process.env.REACT_APP_USERAGENT
  //     });
  //     let lastApiResults = await fetch(apiUrlFm, {
  //       method  : 'GET', 
  //       headers : headers 
  //     });
  //     let dataResults = await lastApiResults.json();
  //     console.log(dataResults);
  //     if (dataResults.results.length > 0) {
  //       setTestApi(dataResults.results.trackmatches.tracks);
  //     } else {
  //       setTestApi([]);
  //       return
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setTestApi([]);
  //   }
  // }

  // useEffect(() => {
  //   testApiFunc();
  // }, []);

  // console.log(testApi);

  return (
    <Container maxWidth='md'>
      <div className='flex-mobi'>
        <Box
          display='inline-flex'
          className='banner-bg'
          alignContent='center'
          justifyContent='center'
        >
          <h2 className='text-inlay cantata-one-regular' style={{cursor: 'default', marginTop: '20px'}}>2WriteAbout</h2>
          <div style={{display: 'flex'}}>
            <Button style={{margin: '20px'}} variant='outlined' title={loginStatus ? 'Logout' : 'Login'} color={loginStatus ? 'success' : 'primary'} onClick={() => setOpenLogin(true)}>
              <Icon>account_circle</Icon>
            </Button>
          </div>
        </Box>
        <Box
          display='flex'
          className='media-box'
        >
          <ItemPanel
            currentPost={currentPost}
            postUpdate={postUpdate}
            setPostUpdate={setPostUpdate}
            displaySelect={displaySelect}
          />
        </Box>
      </div>
      <Box
        display='flex'
        className='app-container'
      >
        {displaySelect === 'select' ?
          <PostsBar 
            postsList={postsList} 
            setCurrentPost={setCurrentPost}
            setDisplaySelect={setDisplaySelect}
          /> 
          : displaySelect === 'post' ? 
          <Post 
            currentPost={currentPost} 
            postUpdate={postUpdate} 
            setPostUpdate={setPostUpdate}
            setDisplaySelect={setDisplaySelect}
          /> 
          : 
          <></>
        }
      </Box>
      <LoginForm 
        openModal={openLogin} 
        setOpenModal={setOpenLogin} 
        setLoginStatus={setLoginStatus} 
        loginStatus={loginStatus}
      />
    </Container>
  )
}

export default Home;