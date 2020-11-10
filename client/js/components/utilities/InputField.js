import React from 'react';
import { string, func, bool, element } from 'prop-types';

function InputField(props) {
    return (
        <div className={props.containerClassName}>
            <div className='d--flex ai--center jc--between'>
                <label className='text--black text--bold' htmlFor={props.id}>
                    {props.label}
                </label>

                {props.children}
            </div>

            <input
                id={props.id}
                className={`${props.inputClassName} ${
                    props.error ? 'b--danger' : 'b--gray-light'
                }`}
                type={props.type}
                value={props.value || ''}
                onChange={props.onChangeEvent}
                autoFocus={props.autoFocus}
            />

            {!!props.error && (
                <span
                    data-testid={`${props.id}-error`}
                    className='d--block text--danger'>
                    {props.error}
                </span>
            )}
        </div>
    );
}

InputField.propTypes = {
    containerClassName: string,
    inputClassName: string,
    id: string.isRequired,
    label: string.isRequired,
    type: string,
    value: string,
    onChangeEvent: func.isRequired,
    error: string,
    autoFocus: bool,
    children: element,
};

InputField.defaultProps = {
    containerClassName: 'mg-t--lg',
    inputClassName: 'b--1 b-rad--sm full-width pd--sm mg-t--sm',
    type: 'text',
    autoFocus: false,
};

export default InputField;
