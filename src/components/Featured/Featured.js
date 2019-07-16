import React, { Component } from 'react';
import Image from '../Image/Image';
import { SRLWrapper } from 'simple-react-lightbox';

class Featured extends Component {
  state = {
    imageClicked: false
  };
  handleImageClick = () => {
    this.setState({
      imageClicked: true
    });
  };
  render() {
    console.log(this.state.imageClicked);
    return (
      <SRLWrapper>
        <div className='featured'>
          <div className='featured-head'>
            <h1>Levon Photography</h1>
            <p>Fotografijos paslaugos Mažeikiuose</p>
            <svg
              className='svg-squares'
              x='0px'
              y='0px'
              viewBox='0 0 381.39 381.39'
            >
              <g>
                <g>
                  <g>
                    <path
                      d='M127.13,0H31.782C14.239,0,0,14.239,0,31.782v95.347c0,17.544,14.239,31.782,31.782,31.782h95.347
				c17.544,0,31.782-14.239,31.782-31.782V31.782C158.912,14.239,144.674,0,127.13,0z'
                    />
                    <path
                      d='M349.607,0H254.26c-17.544,0-31.782,14.239-31.782,31.782v95.347
				c0,17.544,14.239,31.782,31.782,31.782h95.347c17.544,0,31.782-14.239,31.782-31.782V31.782C381.39,14.239,367.151,0,349.607,0z'
                    />
                    <path
                      d='M127.13,222.477H31.782C14.239,222.477,0,236.716,0,254.26v95.347
				c0,17.544,14.239,31.782,31.782,31.782h95.347c17.544,0,31.782-14.239,31.782-31.782V254.26
				C158.912,236.716,144.674,222.477,127.13,222.477z'
                    />
                    <path
                      d='M349.607,222.477H254.26c-17.544,0-31.782,14.239-31.782,31.782v95.347
				c0,17.544,14.239,31.782,31.782,31.782h95.347c17.544,0,31.782-14.239,31.782-31.782V254.26
				C381.39,236.716,367.151,222.477,349.607,222.477z'
                    />
                  </g>
                </g>
              </g>
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
            </svg>
          </div>
          <div className='featured-gallery'>
            <div
              className='featured-gallery__image'
              onClick={this.handleImageClick}
            >
              <Image imageUrl='http://writingexercises.co.uk/images2/randomimage/woodtextures.jpg' />
            </div>
            <div className='featured-gallery__image'>
              <Image imageUrl='http://writingexercises.co.uk/images2/randomimage/tree.jpg' />
            </div>
            <div className='featured-gallery__image'>
              <Image imageUrl='http://writingexercises.co.uk/images2/randomimage/tree.jpg' />
            </div>
            <div className='featured-gallery__image'>
              <Image imageUrl='http://writingexercises.co.uk/images2/randomimage/woodtextures.jpg' />
            </div>
            <div className='featured-gallery__image'>
              <Image imageUrl='http://writingexercises.co.uk/images2/randomimage/boat.jpg' />
            </div>
            <div className='featured-gallery__image'>
              <Image imageUrl='http://writingexercises.co.uk/images2/randomimage/toadstools.jpg' />
            </div>
            <div className='featured-gallery__image'>
              <Image imageUrl='http://writingexercises.co.uk/images2/randomimage/woodtextures.jpg' />
            </div>
            <div className='featured-gallery__image'>
              <Image imageUrl='http://writingexercises.co.uk/images2/randomimage/sandy-boots.jpg' />
            </div>
            <div className='featured-gallery__image'>
              <Image imageUrl='http://writingexercises.co.uk/images2/randomimage/boat.jpg' />
            </div>
            <div className='featured-gallery__image'>
              <Image imageUrl='http://writingexercises.co.uk/images2/randomimage/tree.jpg' />
            </div>
            <div className='featured-gallery__image'>
              <Image imageUrl='http://writingexercises.co.uk/images2/randomimage/woodtextures.jpg' />
            </div>
            <div className='featured-gallery__image'>
              <Image imageUrl='http://writingexercises.co.uk/images2/randomimage/yellowballoon.jpg' />
            </div>
            <div className='featured-gallery__image'>
              <Image imageUrl='http://writingexercises.co.uk/images2/randomimage/tree.jpg' />
            </div>
            <div className='featured-gallery__image'>
              <Image imageUrl='http://writingexercises.co.uk/images2/randomimage/sandy-boots.jpg' />
            </div>
            <div className='featured-gallery__image'>
              <Image imageUrl='http://writingexercises.co.uk/images2/randomimage/woodtextures.jpg' />
            </div>
          </div>
        </div>
      </SRLWrapper>
    );
  }
}

export default Featured;
