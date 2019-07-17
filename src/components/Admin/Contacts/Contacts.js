import React from 'react';

const contacts = () => {
  return (
    <div className='admin-login'>
      <h1>Kontaktai</h1>
      <div className='contacts-form login-form'>
        <form className='message-form'>
          <div className='form-control'>
            <input
              type='text'
              name='phone'
              autoComplete='off'
              placeholder='Telefono numeris'
            />
          </div>
          <div className='form-control'>
            <input type='email' name='email' placeholder='El. paštas' />
          </div>

          <button type='submit' className='form-button'>
            PUBLIKUOTI
          </button>
        </form>
      </div>
    </div>
  );
};

export default contacts;
