import React from 'react';

const gallery = () => {
  return (
    <div className='admin-login'>
      <h1>Albumo sukūrimas</h1>
      <div className='contacts-form login-form'>
        <form className='message-form'>
          <div className='form-control'>
            <input
              type='text'
              name='album-title'
              autoComplete='off'
              placeholder='Albumo pavadinimas'
            />
          </div>
          <div className='form-control'>
            <label for='album-cover'>Albumo pagrindinė nuotrauka</label>
            <input type='file' name='album-cover' />
          </div>
          <div className='form-control'>
            <label for='album-behind-one'>Albumo antrinė nuotrauka</label>
            <input type='file' name='album-behind-one' />
          </div>
          <div className='form-control'>
            <label for='album-behind-two'>Albumo tretinė nuotrauka</label>
            <input type='file' name='album-behind-two' />
          </div>
          <hr />
          <div className='form-control'>
            <label for='album-photos'>Albumo nuotraukos</label>
            <input type='file' multiple name='album-photos' />
          </div>

          <button type='submit' className='form-button'>
            PUBLIKUOTI
          </button>
        </form>
      </div>
    </div>
  );
};

export default gallery;
