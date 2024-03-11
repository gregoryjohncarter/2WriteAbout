import React, { useState, useEffect } from 'react';

import LoginForm from '../components/LoginForm.js';
import ItemPanel from '../components/ItemPanel.js';
import ItemResults from '../components/ItemResults.js';
import PostsBar from '../components/PostsBar.js';
import Post from '../components/Post.js';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

const Home = () => {
  const [loginStatus, setLoginStatus] = useState(0);
  const [postsList, setPostsList] = useState([]);
  const [openLogin, setOpenLogin] = useState(false);
  const [displaySelect, setDisplaySelect] = useState('');
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

  const [lastApiItems, setLastApiItems] = useState([]);

  const lastApiFunc = async (searchQuery) => {
    if (!searchQuery.trim().length) {
      return
    }
    if (googleApiItems.length > 0) {
      setGoogleApiItems([]);
    }
    try {
      let apiUrlFm = "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + searchQuery.trim() + "&api_key=" + process.env.REACT_APP_MYAPI + "&format=json";
      let headers = new Headers({
        "Accept"       : "application/json",
        "Content-Type" : "application/json",
        "User-Agent"   : process.env.REACT_APP_USERAGENT
      });
      let lastApiResults = await fetch(apiUrlFm, {
        method  : 'GET', 
        headers : headers 
      });
      let dataResults = await lastApiResults.json();
      console.log(dataResults);
      if (dataResults.results.trackmatches.track.length > 0) {
        setLastApiItems(dataResults.results.trackmatches.track);
      } else {
        setLastApiItems([]);
        return
      }
    } catch (error) {
      console.log(error);
      setLastApiItems([]);
    }
  }

  const [googleApiItems, setGoogleApiItems] = useState([]);

  const googleApiFunc = async (searchQuery) => {
    if (!searchQuery.trim().length) {
      return
    }
    if (lastApiItems.length > 0) {
      setLastApiItems([]);
    }
    try {
      let apiUrlGoog = "https://www.googleapis.com/books/v1/volumes?q=" + searchQuery;
      let googleApiResults = await fetch(apiUrlGoog);
      if (!googleApiResults.ok) {
        throw new Error('something went wrong!');
      }
      let dataResults = await googleApiResults.json();
      console.log(dataResults);
      if (dataResults.items.length > 0) {
        setGoogleApiItems(dataResults.items)
      } else {
        setGoogleApiItems([]);
        return
      }
    } catch (error) {
      console.log(error)
      setGoogleApiItems([]);
    }
  }

  const [songTile, setSongTile] = useState(false);
  const [bookTile, setBookTile] = useState(false);

  console.log(lastApiItems);
  console.log(googleApiItems);
  console.log(songTile);

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
          <div>
            <Button style={{margin: '20px'}} variant='outlined' title={loginStatus ? 'Log out' : 'Log in'} color={loginStatus ? 'success' : 'primary'} onClick={() => setOpenLogin(true)}>
              <Icon>account_circle</Icon>
            </Button>
          </div>
        </Box>
        {loginStatus ? 
          <Box
            display='flex'
            className='media-box'
          >
            <ItemPanel
              lastApiFunc={lastApiFunc}
              googleApiFunc={googleApiFunc}
              lastApiItems={lastApiItems}
              googleApiItems={googleApiItems}
              setLastApiItems={setLastApiItems}
              setGoogleApiItems={setGoogleApiItems}
              currentPost={currentPost}
              songTile={songTile}
              setSongTile={setSongTile}
              bookTile={bookTile}
              setBookTile={setBookTile}
              postUpdate={postUpdate}
              setPostUpdate={setPostUpdate}
              displaySelect={displaySelect}
            />
          </Box> : <></>
        }
      </div>
      {loginStatus ? 
        <Box
          display='flex'
          className='app-container'
          flexDirection='column'
        > 
          {(lastApiItems.length > 0 || googleApiItems.length > 0) && 
            <ItemResults
              lastApiItems={lastApiItems} 
              googleApiItems={googleApiItems}
              setSongTile={setSongTile}
              setBookTile={setBookTile}
              setLastApiItems={setLastApiItems}
              setGoogleApiItems={setGoogleApiItems}
            />
          }
          {displaySelect === 'select' ?
            <PostsBar 
              postsList={postsList} 
              setCurrentPost={setCurrentPost}
              setDisplaySelect={setDisplaySelect}
            /> 
            : displaySelect === 'post' ? 
            <Post 
              currentPost={currentPost}
              setCurrentPost={setCurrentPost} 
              postUpdate={postUpdate} 
              setPostUpdate={setPostUpdate}
              setDisplaySelect={setDisplaySelect}
            /> 
            : 
            <></>
          }
        </Box>
      :
        <Box
          display='flex'
          className='app-container-start'
          flexDirection='column'
        > 
          <div style={{padding: '30px', display: 'flex'}}>
            <div style={{flex: '1 50%', display: 'inline-flex'}}>
              <Icon style={{borderBottom: '2px solid #4b6fbb'}}>person</Icon>
              <h4 className='step-1'>Create an account & log in to get started</h4>
            </div>
            <div style={{flex: '1 50%', display: 'inline-flex'}}>
              <Icon style={{borderBottom: '2px solid #4b6fbb'}}>add_box</Icon>
              <h4 className='step-1'>Start writing posts for your own use</h4>
            </div>
          </div>
          <div style={{padding: '40px', paddingTop: '0px'}}>
            <Accordion style={{backgroundColor: '#b1b1b1'}}>
              <AccordionSummary
                expandIcon={<Icon color='primary'>expand_more</Icon>}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <h4 className='learn-more'>Additional information</h4>
              </AccordionSummary>
              <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display:'inline-flex'}}>
                  <Icon style={{marginTop: '10px'}}>arrow_right</Icon><p className='step-2'>Choose your post to view on the sidebar, navigate back to change posts</p>
                </div>
                <div style={{display:'inline-flex'}}>
                  <Icon fontSize='small' style={{marginTop: '10px', marginRight: '5px'}}>mode_comment</Icon><p className='step-2'>After writing your post, save at the bottom</p>
                </div>
                <div style={{display:'inline-flex'}}>
                  <Icon style={{marginTop: '10px', marginRight: '5px'}}>add_circle_outline</Icon><p className='step-2'>Search for subjects using Last.fm & Google Books APIs on top and then choose a song and/or book to add</p>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </Box>
      }
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