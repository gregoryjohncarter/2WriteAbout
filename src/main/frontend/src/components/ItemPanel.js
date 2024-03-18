import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

const ItemPanel = ({ 
  lastApiFunc, 
  googleApiFunc, 
  lastApiItems, 
  googleApiItems, 
  setLastApiItems, 
  setGoogleApiItems, 
  currentPost, 
  songTile, 
  setSongTile, 
  bookTile, 
  setBookTile, 
  postUpdate,
  setPostUpdate,
  newPost,
  setNewPost,
  setDisplaySelect,
  lastNone,
  booksNone,
  postTitleVal,
  postContentVal,
  setPostTitleVal,
  setPostContentVal
}) => {
  const [lastSearchQuery, setLastSearchQuery] = useState('');
  const [googleSearchQuery, setGoogleSearchQuery] = useState('');

  const handleLastApiSearch = (searchQuery) => {
    if (!searchQuery.trim().length) {
      return
    }
    lastApiFunc(searchQuery);
    setLastSearchQuery('');
    if (newPost) {
      setNewPost({title: postTitleVal, text: postContentVal, ...newPost});
    }
    if (postUpdate) {
      setPostUpdate({title: postTitleVal, text: postContentVal, ...postUpdate});
    }
  }

  const handleGoogleApiSearch = (searchQuery) => {
    if (!searchQuery.trim().length) {
      return
    }
    googleApiFunc(searchQuery);
    setGoogleSearchQuery('');
    if (newPost) {
      setNewPost({title: postTitleVal, text: postContentVal, ...newPost});
    }
    if (postUpdate) {
      setPostUpdate({title: postTitleVal, text: postContentVal, ...postUpdate});
    }
  }

  const handleCreatePost = () => {
    setDisplaySelect('post');
    setNewPost({title: '', text: '', song: '', artist: '', lastFmUrl: '', book: '', author: '', googBooksUrl: ''});
    setPostTitleVal('');
    setPostContentVal('');
    setSongTile(false);
    setBookTile(false);
  }

  useEffect(() => {
    if (currentPost.song) {
      setSongTile({title:currentPost.song, artist:currentPost.artist, link:currentPost.lastFmUrl})
    }
    if (currentPost.book) {
      setBookTile({title:currentPost.book, author:currentPost.author, link:currentPost.googBooksUrl});
    }
  }, [currentPost]);

  return (
    <>
      {(currentPost || postUpdate || newPost) ? 
        <Grid container spacing={2}>
          <Grid item xs={9} sm={6}>
            {songTile ? 
              <div style={{display:'flex'}}>
                <Card className='song-tile' sx={{ minWidth: 225 }}>
                  <CardContent className='song-tile-font'>
                    {songTile.title}
                  </CardContent>
                  <hr/>
                  <CardContent className='song-tile-artist' style={{display: 'inline-flex', justifyContent: 'space-between', width: '100%', position: 'relative'}}>
                    <div style={{flex: '0 100%'}}>
                      {songTile.artist}
                    </div>
                    <div style={{flex: '0 0%', position: 'absolute', right: '0px', bottom: '-5px'}}>
                      <CardActions>
                        {!currentPost && <Button onClick={()=>setSongTile(false)}><Icon fontSize="large">cancel</Icon></Button>}
                      </CardActions>
                    </div>
                  </CardContent>
                </Card>
                <Button onClick={()=>window.open(songTile.link, '_blank').focus()} variant='filled' title='Link to Last.fm page'>
                  <Icon className='audio-file' fontSize='large'>audio_file</Icon>
                </Button>
              </div>
            : lastApiItems.length > 0 ? 
              <TextField 
                disabled
                id='outlined-disabled'
                label='Search song' 
                variant='filled' 
                size='small'
                value={lastSearchQuery}
                InputProps={{endAdornment: <Button onClick={()=>setLastApiItems([])} variant='outlined' title='Clear search results'><Icon>cancel</Icon></Button>}}
              /> 
            : lastNone ? 
              <TextField
                disabled
                id='outlined-disabled'
                label='No tracks found' 
                variant='filled' 
                size='small'
                value={lastSearchQuery}
              />
            : !currentPost ?
              <TextField 
                id='filled-basic' 
                label='Search song' 
                variant='filled' 
                size='small'
                style={{backgroundColor:'whitesmoke'}}
                onChange={(e)=>setLastSearchQuery(e.target.value)}
                value={lastSearchQuery}
                InputProps={{endAdornment: <Button onClick={()=>handleLastApiSearch(lastSearchQuery)} variant='outlined' title='Search Last.fm API'><Icon>forward_arrow</Icon></Button>}}
              />
            :
              <TextField
                disabled
                id='outlined-disabled'
                label='Search song' 
                variant='filled' 
                size='small'
                value={lastSearchQuery}
              />
            }
          </Grid>
          <Grid item xs={9} sm={6}>
            {bookTile ? 
              <div style={{display:'flex'}}>
                <Card className='book-tile' sx={{ minWidth: 225 }}>
                  <CardContent className='book-tile-font'>
                    {bookTile.title}
                  </CardContent>
                  <hr/>
                  <CardContent className='book-tile-artist' style={{display: 'inline-flex', justifyContent: 'space-between', width: '100%', position: 'relative'}}>
                    <div style={{flex: '0 100%'}}>
                      {bookTile.author}
                    </div>
                    <div style={{flex: '0 0%', position: 'absolute', right: '0px', bottom: '-5px'}}>
                      <CardActions>
                        {!currentPost && <Button onClick={()=>setBookTile(false)}><Icon fontSize="large">cancel</Icon></Button>}
                      </CardActions>
                    </div>
                  </CardContent>
                </Card>
                <Button onClick={()=>window.open(bookTile.link, '_blank').focus()} variant='filled' title='Link to Google Books page'>
                  <Icon className='menu-book' fontSize='large'>menu_book</Icon>
                </Button>
              </div> 
            : googleApiItems.length > 0 ?
              <TextField 
                disabled
                id='outlined-disabled'
                label='Search book' 
                variant='filled' 
                size='small'
                value={googleSearchQuery}
                InputProps={{endAdornment: <Button onClick={()=>setGoogleApiItems([])} variant='outlined' title='Clear search results'><Icon>cancel</Icon></Button>}}
              /> 
            : booksNone ? 
              <TextField 
                disabled
                id='outlined-disabled'
                label='No books found' 
                variant='filled' 
                size='small'
                style={{backgroundColor:'whitesmoke'}}
                value={googleSearchQuery}
              /> 
            : !currentPost ? 
              <TextField 
                id='filled-basic' 
                label='Search book' 
                variant='filled' 
                size='small'
                style={{backgroundColor:'whitesmoke'}}
                onChange={(e)=>setGoogleSearchQuery(e.target.value)}
                value={googleSearchQuery}
                InputProps={{endAdornment: <Button onClick={() => handleGoogleApiSearch(googleSearchQuery)} variant='outlined' title='Search Google Books API'><Icon>forward_arrow</Icon></Button>}}
              />
            :
              <TextField
                disabled
                id='outlined-disabled'
                label='Search book' 
                variant='filled' 
                size='small'
                value={lastSearchQuery}
              />
            }
          </Grid>
        </Grid>
      : 
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button onClick={()=>handleCreatePost()} variant='outlined' style={{paddingBottom: '0px'}}>
              <div className='add-post'>
                <div>
                  <Icon style={{borderBottom: '2px solid #4b6fbb'}}>add_box</Icon>
                </div>
                <div style={{marginLeft: '10px'}}>
                  Create new post
                </div>
              </div>
            </Button>
          </Grid>
        </Grid>
      }
    </>
  )
}

export default ItemPanel;