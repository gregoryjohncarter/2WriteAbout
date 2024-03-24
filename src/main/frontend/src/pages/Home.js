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

import { createTheme } from '@mui/material/styles';

const Home = () => {
  const [loginStatus, setLoginStatus] = useState(0);
  const [postsList, setPostsList] = useState([]);
  const [openLogin, setOpenLogin] = useState(false);
  const [displaySelect, setDisplaySelect] = useState('select');
  const [currentPost, setCurrentPost] = useState(false);
  const [postUpdate, setPostUpdate] = useState(false);
  const [newPost, setNewPost] = useState(false);

  useEffect(() => {
    if (loginStatus !== 0) {
      const postsRequest = async () => {
        const posts = await fetch(`/post/${loginStatus}`);
        let postsResults = await posts.json();
        setPostsList(postsResults);
      }
      postsRequest();
    } else {
      setPostsList([]);
    }
  }, [loginStatus])

  const [lastApiItems, setLastApiItems] = useState([]);
  const [lastNone, setLastNone] = useState(false);

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
      if (dataResults.results.trackmatches.track.length > 0) {
        setLastApiItems(dataResults.results.trackmatches.track);
      } else {
        setLastApiItems([]);
        setLastNone(true);
      }
    } catch (error) {
      console.log(error);
      setLastApiItems([]);
    }
  }

  const lastNoneEffect = useEffect(() => {
    if (lastNone) {
      setTimeout(() => {
        setLastNone(false);
      }, 3500);
    }
  }, [lastNone])

  const [googleApiItems, setGoogleApiItems] = useState([]);
  const [booksNone, setBooksNone] = useState(false);

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
      if (dataResults.totalItems !== 0) {
        setGoogleApiItems(dataResults.items)
      } else {
        setGoogleApiItems([]);
        setBooksNone(true);
      }
    } catch (error) {
      console.log(error)
      setGoogleApiItems([]);
    }
  }

  const booksNoneEffect = useEffect(() => {
    if (booksNone) {
      setTimeout(() => {
        setBooksNone(false);
      }, 3500);
    }
  }, [booksNone]);

  const [songTile, setSongTile] = useState(false);
  const [bookTile, setBookTile] = useState(false);

  const [postTitleVal, setPostTitleVal] = useState('');
  const [postContentVal, setPostContentVal] = useState('');

  const saveNewPost = async (title, text, songTile, bookTile) => {
    if (title.trim().length > 0 && text.trim().length > 0) {
      let userId = loginStatus;
      let song = '';
      let lastFmUrl = '';
      let artist = '';
      if (songTile) {
        song = songTile.title;
        artist = songTile.artist;
        lastFmUrl = songTile.link;
      }
      let book = '';
      let author = '';
      let googBooksUrl = '';
      if (bookTile) {
        book = bookTile.title;
        author = bookTile.author;
        googBooksUrl = bookTile.link;
      }
      const response = await fetch(`/post`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          song,
          lastFmUrl,
          artist,
          book,
          author,
          googBooksUrl,
          text,
          userId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const idResponse = await response.json();
      const idLog = await idResponse;
      if (response.ok) {
        setPostsList([...postsList, { id: idLog.id, title: title, song: song, lastFmUrl: lastFmUrl, artist: artist, book: book, author: author, googBooksUrl: googBooksUrl, text:text, userId: userId, createdAt: idLog.createdAt }]);
        setNewPost(false);
        setPostUpdate(false);
        setCurrentPost(false);
        setSongTile(false);
        setBookTile(false);
        setDisplaySelect('select');
      } else {
        alert(response.statusText);
      }
    } else {
      alert("You must enter a title and content");
      return;
    }
  }

  const saveUpdatedPost = async (title, text, songTile, bookTile, id) => {
    if (title.trim().length > 0 && text.trim().length > 0) {
      let userId = loginStatus;
      let song = '';
      let lastFmUrl = '';
      let artist = '';
      if (songTile) {
        song = songTile.title;
        artist = songTile.artist;
        lastFmUrl = songTile.link;
      }
      let book = '';
      let author = '';
      let googBooksUrl = '';
      if (bookTile) {
        book = bookTile.title;
        author = bookTile.author;
        googBooksUrl = bookTile.link;
      }
      const response = await fetch(`/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          song,
          lastFmUrl,
          artist,
          book,
          author,
          googBooksUrl,
          text,
          userId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        setPostsList([...postsList.map((post) => {
          if (post.id === postUpdate.id) {
            return { id: post.id, title: title, song: song, lastFmUrl: lastFmUrl, artist: artist, book: book, author: author, googBooksUrl: googBooksUrl, text:text, userId: userId, createdAt: post.createdAt }
          } else {
            return post 
          }
        })]);
        setNewPost(false);
        setPostUpdate(false)
        setCurrentPost(false);
        setSongTile(false);
        setBookTile(false);
        setDisplaySelect('select');
      } else {
        alert(response.statusText);
      }
    } else {
      alert("You must enter a title and content");
      return;
    }
  }

  const deletePost = async (id) => {
    const response = await fetch(`/post/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      setPostsList(postsList.filter((post) => { return post.id !== id }));
      setPostUpdate(false);
      setCurrentPost(false);
      setNewPost(false);
      setDisplaySelect('select');
    } else {
      alert(response.statusText);
    }
  }

  useEffect(() => {
    if (displaySelect === 'select') {
      setNewPost(false);
      setPostUpdate(false);
      setCurrentPost(false);
    }
  }, [displaySelect]);

  const [selectPlay, setSelectPlay] = useState(false);
  const [stringAnim, setStringAnim] = useState(false);
  const [fadeClose, setFadeClose] = useState(false);
  const [buttonCooldown, setButtonCooldown] = useState(false);

  useEffect(() => {
    if (fadeClose) {
      setTimeout(() => {
        setFadeClose(false);
      }, 3000);
    }
  }, [fadeClose]);

  const [backTransition, setBackTransition] = useState(false);
  const [backTransition2, setBackTransition2] = useState(false);

  const theme = createTheme({
    palette: {
      active: { 
        main: '#5b7777',
        contrastText: '#fff',
      }
    },
  });

  return (
    <Container maxWidth='md' style={{overflowX: 'hidden'}}>
      <div className='flex-mobi'>
        <Box
          display='inline-flex'
          className='banner-bg'
          alignContent='center'
          justifyContent='center'
        >
          <h2 className='text-inlay cantata-one-regular' style={{cursor: 'default', marginTop: '20px'}}>2WriteAbout</h2>
          <div>
            <Button style={{margin: '20px'}} theme={theme} variant='outlined' title={loginStatus ? 'Log out' : 'Log in'} color={loginStatus ? 'active' : 'primary'} onClick={() => setOpenLogin(true)}>
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
              newPost={newPost}
              setNewPost={setNewPost}
              setDisplaySelect={setDisplaySelect}
              lastNone={lastNone}
              booksNone={booksNone}
              postTitleVal={postTitleVal}
              postContentVal={postContentVal}
              setPostTitleVal={setPostTitleVal}
              setPostContentVal={setPostContentVal}
              buttonCooldown={buttonCooldown}
              backTransition={backTransition}
              backTransition2={backTransition2}
            />
          </Box> : <></>
        }
      </div>
      {loginStatus ? 
        <div className={fadeClose ? 'app-container animate-content-end' : 'app-container'}> 
          <Box
            display='flex'
            flexDirection='column'
            maxWidth='md'
          > 
            {(lastApiItems.length > 0 || googleApiItems.length > 0) ? 
              <ItemResults
                lastApiItems={lastApiItems} 
                googleApiItems={googleApiItems}
                setSongTile={setSongTile}
                setBookTile={setBookTile}
                setLastApiItems={setLastApiItems}
                setGoogleApiItems={setGoogleApiItems}
                setNewPost={setNewPost}
                newPost={newPost}
              />
            : displaySelect === 'select' ?
              <PostsBar 
                postsList={postsList} 
                setCurrentPost={setCurrentPost}
                setDisplaySelect={setDisplaySelect}
                selectPlay={selectPlay}
                setSelectPlay={setSelectPlay}
                stringAnim={stringAnim}
                setStringAnim={setStringAnim}
                setFadeClose={setFadeClose}
                setButtonCooldown={setButtonCooldown}
                buttonCooldown={buttonCooldown}
              /> 
            : displaySelect === 'post' ? 
              <Post 
                currentPost={currentPost}
                setCurrentPost={setCurrentPost}
                newPost={newPost}
                setNewPost={setNewPost}
                postUpdate={postUpdate} 
                setPostUpdate={setPostUpdate}
                setDisplaySelect={setDisplaySelect}
                saveNewPost={saveNewPost}
                songTile={songTile}
                setSongTile={setSongTile}
                bookTile={bookTile}
                setBookTile={setBookTile}
                postTitleVal={postTitleVal}
                postContentVal={postContentVal}
                setPostTitleVal={setPostTitleVal}
                setPostContentVal={setPostContentVal}
                saveUpdatedPost={saveUpdatedPost}
                deletePost={deletePost}
                setBackTransition2={setBackTransition2}
                backTransition={backTransition}
                setBackTransition={setBackTransition}
              /> 
            : 
              <></>
            }
          </Box>
        </div>
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
                style={{backgroundColor: '#a0a0a0'}}
              >
                <h4 className='learn-more'>Additional information</h4>
              </AccordionSummary>
              <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display:'inline-flex'}}>
                  <Icon style={{marginTop: '10px', marginRight: '5px'}}>add_circle_outline</Icon><p className='step-2'>Search for subjects using Last.fm & Google Books APIs and then choose a song and/or book to add</p>
                </div>
                <div style={{display:'inline-flex'}}>
                  <Icon fontSize='medium' style={{marginTop: '10px', marginRight: '5px'}}>cancel</Icon><p className='step-2'>If you want to go back, clear the search results by selecting the cancel button on the search bar</p>
                </div>
                <div style={{display:'inline-flex'}}>
                  <Icon fontSize='medium' style={{marginTop: '10px', marginRight: '5px'}}>mode_comment</Icon><p className='step-2'>Remember to save, click edit post to change post items and/or content</p>
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