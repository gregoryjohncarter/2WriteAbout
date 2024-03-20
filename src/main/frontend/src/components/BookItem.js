import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

const BookItem = ({ keyIndex, author, title, link, setBookTile, setGoogleApiItems }) => {
  const [showItem, setShowItem] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowItem(true);
    }, 100 * keyIndex);
  }, []);
  const handleSetBookTile = () => {
    setBookTile({title:title, author:author, link:link});
    setGoogleApiItems([]);
  }

  return (
    showItem ? 
      <Card className={keyIndex % 2 === 0 ? 'alternate anim-show-item' : 'card anim-show-item'} sx={{ minWidth: 275 }}>
        <CardContent className='title-font'>
          {title}
        </CardContent>
        <hr/>
        <CardContent className='artist-font' style={{display: 'inline-flex', justifyContent: 'space-between', width: '100%', position: 'relative'}}>
          <div style={{flex: '0 100%'}}>
          {author}
          </div>
          <div style={{flex: '0 0%', position: 'absolute', right: '13px', bottom: '-10px'}}>
            <CardActions>
              <Button onClick={()=>handleSetBookTile()}><Icon fontSize="large">add_circle_outline</Icon></Button>
            </CardActions>
          </div>
        </CardContent>
      </Card>
    :
      <></>
  )
}

export default BookItem;