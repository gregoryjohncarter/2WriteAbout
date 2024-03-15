import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

const PostsBar = ({ postsList, setCurrentPost, setDisplaySelect }) => {
  return (
    <Box
      display='flex'
      className='posts-container'
      flexDirection='column'
    > 
      <Grid container spacing={0}>
        {postsList.length > 0 ? postsList.map((post, index) => {
          return <Grid key={index} item xs={11}>
            <div className='posts-item'>
              {post.title}
              <div className='post-arrow-right'>
                <Icon fontSize='large'>arrow_right</Icon>
              </div>
            </div>
          </Grid>
        }) : <></>}
      </Grid>
    </Box>
  )
}

export default PostsBar;