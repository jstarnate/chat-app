import React from 'react';
import { string, element } from 'prop-types';

function Modal({ prompt, children }) {
    return (
        <section className='d--flex ai--center jc--center overlay'>
            <div className='bg--white b-rad--md overlay__modal'>
                <p className='font--lg pd--md'>{prompt}</p>
                <div className='d--flex jc--end bt--1 b--gray-light pd--sm'>
                    {children}
                </div>
            </div>
        </section>
    );
}

Modal.propTypes = {
    prompt: string.isRequired,
    children: element,
};

export default Modal;
