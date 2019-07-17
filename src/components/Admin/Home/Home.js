import React from 'react';

const home = () => {
  return (
    <div className='admin-login'>
      <h1>Pagrindinis puslapis</h1>
      <div className='contacts-form login-form'>
        <form className='message-form'>
          <div className='form-control'>
            <label for='home-photos'>Pagrindinio puslapio nuotraukos</label>
            <input type='file' multiple name='home-photos' />
          </div>

          <button type='submit' className='form-button'>
            PUBLIKUOTI
          </button>
        </form>
      </div>
    </div>
  );
};

export default home;
