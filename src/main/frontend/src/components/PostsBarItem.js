import React, { useState } from 'react';

import Icon from '@mui/material/Icon';

const PostsBarItem = ({ selectPlay, stringAnim, post }) => {
  const [hoverBar, setHoverBar] = useState(false);

  return (
    <div 
      onMouseEnter={!selectPlay ? ()=>setHoverBar(true) : ()=>console.log('')} 
      onMouseLeave={!selectPlay ? ()=>setHoverBar(false) : ()=>console.log('')} 
      className={!selectPlay ? 'posts-item' : 'posts-item posts-item-fade'}
    >
      {!stringAnim ? post.title : stringAnim.map((word, index2) => {
        return <span 
          key={'l' + index2} 
          style={{'--i': `${index2}`, 'display': 'inline-block'}} 
          className='select-play'
        >
          {word}
        </span>
      })}
      <div className={hoverBar ? 'post-arrow-right post-arrow-right-hover' : 'post-arrow-right'}>
        <Icon fontSize='large'>
          arrow_right
        </Icon>
      </div>
    </div>
  )
}

export default PostsBarItem;