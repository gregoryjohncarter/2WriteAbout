import React, { useState, useEffect } from 'react';

import PostsBarItem from './PostsBarItem.js';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const PostsBar = ({ 
  postsList, 
  setCurrentPost, 
  setDisplaySelect, 
  selectPlay, 
  setSelectPlay, 
  stringAnim, 
  setStringAnim,
  setFadeClose,
  setButtonCooldown
}) => {
  
  const handleSelectPost = (post) => {
    setSelectPlay(post.title);
    setButtonCooldown(true);
    setTimeout(() => {
      setTimeout(() => {
        setCurrentPost(post);
        setDisplaySelect('post');
        setSelectPlay(false);
        setStringAnim(false);
        setButtonCooldown(false);
      }, 1500);
      setFadeClose(true);
    }, 2000);
  }

  useEffect(() => {
    if (selectPlay) {
      let stringTitle = selectPlay.split(' ');
      setStringAnim(stringTitle);
    }
  }, [selectPlay]);

  return (
    <Box
      display='flex'
      className='posts-container'
      flexDirection='column'
    > 
      <Grid container spacing={0}>
        {postsList.length > 0 ? postsList.map((post, index) => {
          return <Grid item className={!stringAnim ? 'animate-content-start posts-bar-item' : 'posts-bar-item'} xs={11} key={index+'box'} onClick={!selectPlay ? ()=>handleSelectPost(post) : ()=>console.log('')}>
            <PostsBarItem 
              key={index+'k'} 
              indexKey={index}
              selectPlay={selectPlay} 
              stringAnim={stringAnim}
              post={post}
            />
          </Grid> 
        })
          : 
          <Grid item xs={12}>
            <Box className='animate-content-start' display='flex' justifyContent='center' style={{paddingTop: '80px'}}>
              <Button size='small' variant='outlined' disabled>Begin by creating a post above</Button>
            </Box>
          </Grid>
        }
      </Grid>
    </Box>
  )
}

export default PostsBar;