import React, { Fragment } from 'react';
import Spinner from './Spinner';

function LoadingMessagesContainer() {
    return (
        <Fragment>
            <header className='pos--sticky bg--pale bb--1 b--gray-lighter pd--md main__header'>
                <div className='bg--gray-lighter main__name-placeholder'></div>
            </header>

            <Spinner className='mg-t--md' />
        </Fragment>
    );
}

export default LoadingMessagesContainer;
