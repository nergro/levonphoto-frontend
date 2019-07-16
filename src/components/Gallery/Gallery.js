import React, { Component } from 'react';
import Album from './Album/Album';

class gallery extends Component {
  render() {
    return (
      <div className='gallery'>
        <h1 className='gallery-title'>Galerija</h1>
        <div className='gallery-albums'>
          <a href='/galerija/1'>
            <Album
              coverUrl='https://levonphoto.lt/img/portfolio/22.jpg'
              beforeOneUrl='https://levonphoto.lt/img/portfolio/21.jpg'
              beforeTwoUrl='https://levonphoto.lt/img/portfolio/20.jpg'
              albumTitle='Pirmas albumas'
            />
          </a>
          <a href='/galerija/2'>
            <Album
              coverUrl='https://levonphoto.lt/img/portfolio/10.jpg'
              beforeOneUrl='https://levonphoto.lt/img/portfolio/11.jpg'
              beforeTwoUrl='https://levonphoto.lt/img/portfolio/13.jpg'
              albumTitle='Antras albumas'
            />
          </a>
          <a href='/galerija/3'>
            <Album
              coverUrl='https://levonphoto.lt/img/portfolio/8.jpg'
              beforeOneUrl='https://levonphoto.lt/img/portfolio/15.jpg'
              beforeTwoUrl='https://levonphoto.lt/img/portfolio/7.jpg'
              albumTitle='Trecias albumas'
            />
          </a>
          <a href='/galerija/4'>
            <Album
              coverUrl='https://levonphoto.lt/img/portfolio/19.jpg'
              beforeOneUrl='https://levonphoto.lt/img/portfolio/9.jpg'
              beforeTwoUrl='https://levonphoto.lt/img/portfolio/10.jpg'
              albumTitle='Ketvirtas albumas'
            />
          </a>
          <a href='/galerija/5'>
            <Album
              coverUrl='https://levonphoto.lt/img/portfolio/14.jpg'
              beforeOneUrl='https://levonphoto.lt/img/portfolio/9.jpg'
              beforeTwoUrl='https://levonphoto.lt/img/portfolio/17.jpg'
              albumTitle='Penktas albumas'
            />
          </a>
          <a href='/galerija/6'>
            <Album
              coverUrl='https://levonphoto.lt/img/portfolio/17.jpg'
              beforeOneUrl='https://levonphoto.lt/img/portfolio/10.jpg'
              beforeTwoUrl='https://levonphoto.lt/img/portfolio/14.jpg'
              albumTitle='Sestas albumas'
            />
          </a>
          <a href='/galerija/7'>
            <Album
              coverUrl='https://levonphoto.lt/img/portfolio/15.jpg'
              beforeOneUrl='https://levonphoto.lt/img/portfolio/14.jpg'
              beforeTwoUrl='https://levonphoto.lt/img/portfolio/11.jpg'
              albumTitle='Septintas albumas'
            />
          </a>
        </div>
      </div>
    );
  }
}

export default gallery;
