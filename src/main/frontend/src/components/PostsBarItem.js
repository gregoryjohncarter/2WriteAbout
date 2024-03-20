import React, { useState, useEffect } from 'react';

import Icon from '@mui/material/Icon';

const PostsBarItem = ({ indexKey, selectPlay, stringAnim, post }) => {
  const [showPost, setShowPost] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowPost(true);
    }, 100 * indexKey);
  }, []);

  return (
    showPost ? 
      <div className={!selectPlay ? 'posts-item' : 'posts-item posts-item-fade'}>
        {!stringAnim ? post.title : stringAnim.map((word, index2) => {
          return <span key={'l' + index2} style={{
            '--i': `${index2}`, 'display': 'inline-block'
          }} className='select-play'>{word}</span>
        })}
        <div className='post-arrow-right'>
          <Icon fontSize='large'>arrow_right</Icon>
        </div>
      </div>
    : 
      <></>
  )
}

export default PostsBarItem;