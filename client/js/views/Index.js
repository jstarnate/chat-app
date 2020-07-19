import React, { useState } from 'react'
import { post } from 'axios'
import InputField from 'Utilities/InputField'
import useInput from 'Hooks/useInput'

export default function() {
	const [username, usernameData, setUsernameError] = useInput(null)
	const [password, passwordData, setPasswordError] = useInput(null)
	const [authError, setAuthError] = useState(null)
	const [loading, setLoading] = useState(false)

	function submit(event) {
		event.preventDefault()

		setLoading(true)

		post('/signin', { username, password })
			.then(({ data }) => {
				sessionStorage.setItem('jwt-token', data.token)
				location = '/home'
			})
			.catch(error => {
				const { data } = error.response
				
				setUsernameError(data.username)
				setPasswordError(data.password)
				setAuthError(data.auth)
				setLoading(false)
			})
	}

	return (
		<section>
			{ !!authError && <p data-testid='auth-error' className='text--danger mg-t--md'>{authError}</p> }

			<form data-testid='form' onSubmit={submit}>
				<InputField id='username' label='Username' autoFocus {...usernameData} />

				<InputField id='password' type='password' label='Password' {...passwordData} />

				<div className='d--flex ai--center jc--between mg-t--lg'>
					<button
						data-testid='submit-button'
						className='btn btn--blue font--lg text--bold pd-t--sm pd-b--sm pd-l--md pd-r--md b-rad--sm'
						disabled={(!username || !password) ||loading}>
						Sign in
					</button>
					
					<a className='text--info font--lg' href=''>I forgot my password</a>
				</div>
			</form>
		</section>
	)
}
