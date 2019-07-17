import React from 'react';

const services = () => {
  return (
    <div className='admin-login'>
      <h1>Paslaugos</h1>
      <div className='contacts-form login-form'>
        <form className='message-form'>
          <div className='form-control'>
            <p>Pirma pastraipa</p>
            <input
              type='text'
              name='title-one'
              autoComplete='off'
              placeholder='Antraštė'
            />
          </div>
          <div className='form-control'>
            <input type='text' name='description-one' placeholder='Aprašymas' />
          </div>

          <div className='form-control'>
            <p>Antra pastraipa</p>
            <input
              type='text'
              name='title-two'
              autoComplete='off'
              placeholder='Antraštė'
            />
          </div>
          <div className='form-control'>
            <input type='text' name='description-two' placeholder='Aprašymas' />
          </div>

          <div className='form-control'>
            <p>Trečia pastraipa</p>
            <input
              type='text'
              name='title-three'
              autoComplete='off'
              placeholder='Antraštė'
            />
          </div>
          <div className='form-control'>
            <input
              type='text'
              name='description-three'
              placeholder='Aprašymas'
            />
          </div>

          <button type='submit' className='form-button'>
            PUBLIKUOTI
          </button>
        </form>
      </div>
    </div>
  );
};

export default services;
