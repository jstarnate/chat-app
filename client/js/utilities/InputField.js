import React from 'react'
import { string, func, bool } from 'prop-types'

function InputField({ containerClassName, inputClassName, id, label, type, value, onChangeEvent, error, autoFocus, children }) {
	return (
		<div className={containerClassName}>
			<div className='d--flex ai--center jc--between'>
				<label className='text--black text--bold' htmlFor={id}>{label}</label>
				{children}
			</div>
			<input
				id={id}
				data-testid={`${id}-input`}
				className={`${inputClassName} ${error ? 'b--danger' : 'b--gray-40'}`}
				type={type}
				value={value || ''}
				onChange={onChangeEvent}
				autoFocus={autoFocus}
			/>
			{ !!error && <span data-testid={`${id}-error`} className='d--block text--danger'>{error}</span> }
		</div>
	)
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
	autoFocus: bool
}

InputField.defaultProps = {
	containerClassName: 'mg-t--lg',
	inputClassName: 'b--1 b-rad--sm full-width pd--sm mg-t--sm',
	type: 'text',
	autoFocus: false
}

export default InputField