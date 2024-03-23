import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

const Post = ({ 
  currentPost,
  setCurrentPost,
  newPost, 
  setNewPost, 
  postUpdate, 
  setPostUpdate, 
  setDisplaySelect, 
  saveNewPost, 
  songTile, 
  setSongTile, 
  bookTile, 
  setBookTile, 
  postTitleVal, 
  postContentVal, 
  setPostTitleVal, 
  setPostContentVal,
  saveUpdatedPost,
  deletePost,
  setBackTransition2,
  backTransition,
  setBackTransition
}) => {
  const [gradient, setGradient] = useState(false);

  const gradientEffect = useEffect(() => {
    if (gradient) {
      setTimeout(() => {
        setGradient(false);
      }, 4000);
    } else {
      return
    }
  }, [gradient]);

  const handleReturnPosts = () => {
    setBackTransition(true)
    setTimeout(() => {
      setBackTransition2(true);
      setTimeout(() => {
        setBackTransition(false);
        setBackTransition2(false)
        setPostUpdate(false);
        setNewPost(false);
        setDisplaySelect('select');
        setSongTile(false);
        setBookTile(false);
        setCurrentPost(false);
      }, 1000);
    }, 750);
  }

  const handleEditPost = (currentPost) => {
    setPostUpdate(currentPost);
    setPostTitleVal(currentPost.title);
    setPostContentVal(currentPost.text);
    setCurrentPost(false);
    setNewPost(false);
  }

  useEffect(() => {
    if (bookTile && newPost) {
      setNewPost({...newPost, title: postTitleVal, text: postContentVal, book: bookTile.title, author: bookTile.author, googBooksUrl: bookTile.link});
    } 
    if (!bookTile && newPost) {
      setNewPost({...newPost, book: '', author: '', googBooksUrl: ''});
    }
    if (bookTile && postUpdate) {
      setPostUpdate({...postUpdate, title: postTitleVal, text: postContentVal, book: bookTile.title, author: bookTile.author, googBooksUrl: bookTile.link});
    }
    if (!bookTile && postUpdate) {
      setPostUpdate({...postUpdate, book: '', author: '', googBooksUrl: ''});
    }
  }, [bookTile]);

  useEffect(() => {
    if (songTile && newPost) {
      setNewPost({...newPost, title: postTitleVal, text: postContentVal, song: songTile.title, artist: songTile.artist, lastFmUrl: songTile.link});
    }
    if (!songTile && newPost) {
      setNewPost({...newPost, song: '', artist: '', lastFmUrl: ''});
    }
    if (songTile && postUpdate) {
      setPostUpdate({...postUpdate, title: postTitleVal, text: postContentVal, song: songTile.title, artist: songTile.artist, lastFmUrl: songTile.link});
    }
    if (!songTile && postUpdate) {
      setPostUpdate({...postUpdate, song: '', artist: '', lastFmUrl: ''});
    }
  }, [songTile]);

  return (
    <>
      {(newPost || postUpdate) ?
        <section className={backTransition? 'filler' : 'filler-full'}>
          <Button variant='contained' onClick={()=>handleReturnPosts()}>
            <Icon>arrow_backward</Icon>Go back
          </Button>
          <form className={gradient ? 'post-title-focus' : 'post-title'}>
            <h3 style={{marginTop: '-5px', marginBottom: '-15px'}}>
              Title
            </h3>
            <input value={postTitleVal} onChange={(e)=>setPostTitleVal(e.target.value)} onFocus={()=>setGradient(true)} type='text' id='post-title' name='post-title' maxLength='255'/>
            <h3 style={{marginTop: '-15px', marginBottom: '-15px'}}>
              Content
            </h3>
            <textarea value={postContentVal} onChange={(e)=>setPostContentVal(e.target.value)} onFocus={()=>setGradient(true)} id='post-content'/>
            {newPost ? 
              <Button onClick={()=>saveNewPost(postTitleVal, postContentVal, songTile, bookTile)} variant='contained' color='inherit'>
                <Icon style={{marginRight: '10px'}}>mode_comment</Icon>Save post
              </Button> 
            :
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <Button onClick={()=>saveUpdatedPost(postTitleVal, postContentVal, songTile, bookTile, postUpdate.id)} variant='contained' color='inherit'>
                  <Icon style={{marginRight: '10px'}}>mode_comment</Icon>Update post
                </Button>
                <Button style={{marginTop: '20px'}} onClick={()=>deletePost(postUpdate.id)} variant='contained' color='error'>
                  <Icon style={{marginRight: '10px'}}>delete</Icon>Delete post
                </Button>
              </div>
            }
          </form>
        </section>
      : 
        <section className={backTransition? 'filler' : 'filler-full'}>
          <Button variant='contained' onClick={()=>handleReturnPosts()}>
            <Icon>arrow_backward</Icon>Go back
          </Button>
          <form className='post-title'>
            <h3 id='post-title-h3' className='current-post-title'>
              {currentPost.title}
            </h3>
            <textarea value={currentPost.text} readOnly id='post-content' className='current-post-content'/>
            <div style={{alignSelf: 'end', marginTop: '-20px', color: '#4e4f51'}}>
              <span style={{fontStyle:'italic'}}>Date created:</span> {currentPost.createdAt.split('T')[0]}
            </div>
            <Button onClick={()=>handleEditPost(currentPost)} variant='contained' color='inherit'>
              <Icon style={{marginRight: '10px'}}>mode_comment</Icon>Edit post
            </Button>
          </form>
        </section>
      }
    </>
  )
}

export default Post;