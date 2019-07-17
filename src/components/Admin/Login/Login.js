import React from 'react';

const login = () => {
  return (
    <div className='admin-login'>
      <h1>Prisijungti</h1>
      <div className='contacts-form login-form'>
        <form className='message-form'>
          <div className='form-control'>
            <input
              type='text'
              name='name'
              autoComplete='off'
              placeholder='Prisijungimo vardas'
            />
          </div>
          <div className='form-control'>
            <input type='password' name='password' placeholder='Slaptažodis' />
          </div>

          <button type='submit' className='form-button'>
            PRISIJUNGTI
          </button>
        </form>
      </div>
    </div>
  );
};

export default login;
