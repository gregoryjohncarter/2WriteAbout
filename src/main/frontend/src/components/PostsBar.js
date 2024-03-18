import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

const PostsBar = ({ postsList, setCurrentPost, setDisplaySelect }) => {
  const handleSelectPost = (post) => {
    setCurrentPost(post);
    setDisplaySelect('post');
  }
  return (
    <Box
      display='flex'
      className='posts-container'
      flexDirection='column'
    > 
      <Grid container spacing={0}>
        {postsList.length > 0 ? postsList.map((post, index) => {
          return <Grid key={index} item xs={11} onClick={()=>handleSelectPost(post)}>
              <div className='posts-item'>
                {post.title}
                <div className='post-arrow-right'>
                  <Icon fontSize='large'>arrow_right</Icon>
                </div>
              </div>
            </Grid>
          })
        : 
          <Grid item xs={12}>
            <Box display='flex' justifyContent='center' style={{paddingTop: '80px'}}>
              <Button size='small' variant='outlined' disabled>Begin by creating a post above</Button>
            </Box>
          </Grid>
        }
      </Grid>
    </Box>
  )
}

export default PostsBar;