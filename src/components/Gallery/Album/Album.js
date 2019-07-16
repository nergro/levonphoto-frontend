import React from 'react';
import './Album.scss';

const album = props => {
  const beforeOne = {
    backgroundImage: `url(${props.beforeOneUrl})`
  };
  const beforeTwo = {
    backgroundImage: `url(${props.beforeTwoUrl})`
  };
  return (
    <div className='album'>
      <div className='album-behind-one' style={beforeOne} />
      <div className='album-behind-two' style={beforeTwo} />
      <img className='album-cover' src={props.coverUrl} alt='album' />
      <h3>{props.albumTitle}</h3>
    </div>
  );
};

export default album;
