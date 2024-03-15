import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

const Post = ({ currentPost, setCurrentPost, postUpdate, setPostUpdate, setDisplaySelect }) => {
  const [gradient, setGradient] = useState(false);

  const gradientEffect = useEffect(() => {
    if (gradient) {
      setTimeout(() => {
        setGradient(false);
      }, 4000);
    } else {
      return
    }
  }, [gradient])

  const handleReturnPosts = () => {
    setPostUpdate(false)
    setDisplaySelect('select');
  }

  return (
    <section>
      <Button variant='contained' onClick={()=>handleReturnPosts()}>
        <Icon>arrow_backward</Icon>Go back
      </Button>
      <form className={gradient ? 'post-title-focus' : 'post-title'}>
        <div>
          <h3 style={{marginBottom: '10px'}}>
            Title
          </h3>
          <input onFocus={()=>setGradient(true)} type='text' id='post-title' name='post-title'/>
        </div>
        <div>
          <h3 style={{marginTop: '20px', marginBottom: '10px'}}>
            Content
          </h3>
          <textarea onFocus={()=>setGradient(true)} id='post-content'>

          </textarea>
        </div>
        <Button variant='contained' color='inherit'>
          <Icon>mode_comment</Icon>Save post
          </Button>
      </form>
    </section>
  )
}

export default Post;