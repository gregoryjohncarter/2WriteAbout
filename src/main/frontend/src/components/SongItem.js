import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

const SongItem = ({ keyIndex, artist, title, link, setSongTile, setLastApiItems }) => {
  const handleSetSongTile = () => {
    setSongTile({title:title, artist:artist, link:link});
    setLastApiItems([]);
  }
  
  return (
    <Card className={keyIndex % 2 === 0 ? 'alternate' : 'card'} sx={{ minWidth: 275 }}>
      <CardContent className='title-font'>
        {title}
      </CardContent>
      <hr/>
      <CardContent className='artist-font' style={{display: 'inline-flex', justifyContent: 'space-between', width: '100%', position: 'relative'}}>
        <div style={{flex: '0 100%'}}>
          {artist}
        </div>
        <div style={{flex: '0 0%', position: 'absolute', right: '13px', bottom: '-10px'}}>
          <CardActions>
            <Button onClick={()=>handleSetSongTile()}><Icon fontSize="large">add_circle_outline</Icon></Button>
          </CardActions>
        </div>
      </CardContent>
    </Card>
  )
}

export default SongItem;