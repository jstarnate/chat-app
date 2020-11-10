import React, { memo } from 'react';
import { string, bool, func } from 'prop-types';

function UpdateFormInputField({ label, error, ...restProps }) {
    return (
        <div className='mg-t--md'>
            <label className='text--black text--bold'>{label}</label>
            <input
                className='full-width b--1 b--gray-light pd--xs b-rad--sm mg-t--xs'
                type='text'
                {...restProps}
            />
            {error && <span className='text--danger'>{error}</span>}
        </div>
    );
}

UpdateFormInputField.propTypes = {
    label: string.isRequired,
    value: string.isRequired,
    disabled: bool.isRequired,
    onChange: func.isRequired,
    error: string,
};

export default memo(UpdateFormInputField);
