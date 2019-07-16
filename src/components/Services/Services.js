import React from 'react';
import { SRLWrapper } from 'simple-react-lightbox';

const services = props => {
  return (
    <SRLWrapper>
      <div className='services'>
        <div className='services-left'>
          <img src={props.coverUrl} alt='Cover' />
        </div>
        <div className='services-right'>
          <h1 className='services-right__title'>PASLAUGOS</h1>
          <div className='services-right__services'>
            <div className='services-right__service'>
              <h4>Fotografuoju</h4>
              <p>
                Įvairias šeimos šventes: jubiliejus, krikštynas, gimtadienius,
                mergvakarius ir visą kitą.
              </p>
            </div>
            <div className='services-right__service'>
              <h4>Fotosesijos</h4>
              <p>Asmeninės, šeimų, vaikų, porų, neštukių, proginės.</p>
            </div>
            <div className='services-right__service'>
              <h4>Video</h4>
              <p>Filmuoju ir montuoju video klipus ir sveikinimus.</p>
            </div>
          </div>
        </div>
      </div>
    </SRLWrapper>
  );
};

export default services;
