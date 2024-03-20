import React from 'react';

import SongItem from './SongItem.js';
import BookItem from './BookItem.js';

const ItemResults = ({ lastApiItems, googleApiItems, setSongTile, setBookTile, setLastApiItems, setGoogleApiItems, setNewPost, newPost }) => {
  return (
    <div style={{display: 'inline-flex', flexDirection: 'column'}}>
      {lastApiItems.length > 0 ? 
        <>
          <h2 className='last-font'>Showing results from Last.fm API</h2>
          <p className='choose-plus'>
            Choose <span style={{color:'blue', fontWeight: 'bold', fontSize: '17px'}}>+</span> to select a song, or choose <span style={{color:'blue', fontWeight: 'bold'}}>X</span> to return
          </p>
          {lastApiItems.map((song, index) => {
            return (
              <SongItem
                key={index}
                keyIndex={index}
                artist={song.artist ? song.artist : 'No artist to display'}
                title={song.name ? song.name : ''}
                link={song.url ? song.url : ''}
                setSongTile={setSongTile}
                setLastApiItems={setLastApiItems}
              />
            )
          })}
        </>
      : googleApiItems.length > 0 ? 
        <>
          <h2 className='last-font'>Showing results from Google Books API</h2>
          <p className='choose-plus'>
            Choose <span style={{color:'blue', fontWeight: 'bold', fontSize: '17px'}}>+</span> to select a book, or choose <span style={{color:'blue', fontWeight: 'bold'}}>X</span> to return
          </p>
          {googleApiItems.map((book, index) => {
            return (
              <BookItem
                key={book.id}
                keyIndex={index}
                author={book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'No author to display'}
                title={book.volumeInfo.title ? book.volumeInfo.title : ''}
                link={book.volumeInfo.infoLink ? book.volumeInfo.infoLink : ''}
                setBookTile={setBookTile}
                setGoogleApiItems={setGoogleApiItems}
              />
            )
          })}
        </>
      : 
        <></>}
    </div>
  )
}

export default ItemResults;