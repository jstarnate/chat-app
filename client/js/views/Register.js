import React, { useState } from 'react'
import { post } from 'axios'
import InputField from 'Utilities/InputField'
import useInput from 'Hooks/useInput'

export default function() {
	const [first_name, firstnameData, setFirstnameError] = useInput(null)
	const [last_name, lastnameData, setLastnameError] = useInput(null)
	const [username, usernameData, setUsernameError] = useInput(null)
	const [password, passwordData, setPasswordError] = useInput(null)
	const [gender, genderData, setGenderError] = useInput(null)
	const [type, setType] = useState('password')
	const [loading, setLoading] = useState(false)

	function toggleType() {
		setType(type === 'password' ? 'text' : 'password')
	}

	function submit(event) {
		event.preventDefault()

		setLoading(true)

		post('/signup', { first_name, last_name, username, gender, password })
			.then(({ data }) => {
				sessionStorage.setItem('jwt-token', data.token)
				location = '/index'
			})
			.catch(error => {
				const { first_name, last_name, username, gender, password } = error.response.data

				setFirstnameError(first_name)
				setLastnameError(last_name)
				setUsernameError(username)
				setPasswordError(password)
				setGenderError(gender)
				setLoading(false)
			})
	}

	return (
		<form data-testid='form' onSubmit={submit}>
			<InputField id='firstname' label='First name' autoFocus {...firstnameData} />
			<InputField id='lastname' label='Last name' {...lastnameData} />
			<InputField id='username' label='Username' {...usernameData} />

			<InputField id='password' label='Password' type={type} {...passwordData}>
				<button data-testid='type-toggle' className='btn text--info' type='button' onClick={toggleType}>
					{ type === 'password' ? 'Show' : 'Hide' }
				</button>
			</InputField>

			<div className='mg-t--lg'>
				<div className='d--flex'>
					<label className='text--black text--bold'>Gender</label>
					
					{genderData.error &&
						<span data-testid='gender-error' className='d--block text--danger mg-l--auto'>{genderData.error}</span>
					}
				</div>

				<div className='mg-t--sm'>
					<label>
						<input type='radio' name='gender' value='Male' onChange={genderData.onChangeEvent} />
						<span className='font--lg mg-l--sm'>Male</span>
					</label>
					<label className='mg-l--lg'>
						<input type='radio' name='gender' value='Female' onChange={genderData.onChangeEvent} />
						<span className='font--lg mg-l--sm'>Female</span>
					</label>
				</div>
			</div>

			<button
				data-testid='submit-button'
				className='btn btn--blue full-width font--lg text--bold b-rad--sm pd-t--sm pd-b--sm pd-l--md pd-r--md mg-t--lg'
				disabled={(!first_name || !last_name || !username || !gender || !password) || loading}>
				Sign up
			</button>
		</form>
	)
}
