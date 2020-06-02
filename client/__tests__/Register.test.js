import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Register from '../js/views/Register'
import '@testing-library/jest-dom'

describe('Register.js', () => {
	afterEach(cleanup)

	it('Password input type should be "password"', () => {
		const { getByTestId } = render(<Register />)

    	expect(getByTestId('password-input').type).toBe('password')
	})

	it('Submit button should be disabled on render', () => {
		const { getByTestId } = render(<Register />)

    	expect(getByTestId('submit-button').disabled).toBeTruthy()
	})

	it('Toggling password type should switch between "text" and "password"', () => {
		const { getByTestId } = render(<Register />)

		fireEvent.click(getByTestId('type-toggle'))
		expect(getByTestId('password-input').type).toBe('text')
		expect(getByTestId('type-toggle')).toHaveTextContent('Hide')

		fireEvent.click(getByTestId('type-toggle'))
		expect(getByTestId('password-input').type).toBe('password')
		expect(getByTestId('type-toggle')).toHaveTextContent('Show')
	})

	it('Submit button should be enabled if all inputs are not empty', () => {
		const { getByTestId } = render(<Register />)

		fireEvent.change(getByTestId('firstname-input'), { target: {value: 'firstname'} })
		fireEvent.change(getByTestId('lastname-input'), { target: {value: 'lastname'} })
		fireEvent.change(getByTestId('username-input'), { target: {value: 'username'} })
		fireEvent.change(getByTestId('password-input'), { target: {value: 'password'} })

    	expect(getByTestId('submit-button').disabled).toBeFalsy()
	})
})