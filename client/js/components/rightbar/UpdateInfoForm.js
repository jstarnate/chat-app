import React, { useState, useEffect, useCallback, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { post as axiosPost, put as axiosPut, delete as axiosDelete } from 'axios'
import { set } from 'Actions'
import UpdateFormInputField from './UpdateFormInputField'
import MaleDefaultAvatar from 'Utilities/MaleDefaultAvatar'
import FemaleDefaultAvatar from 'Utilities/FemaleDefaultAvatar'
import Pulse from 'Utilities/Pulse'

const user = JSON.parse(localStorage.getItem('user'))
const axiosConfig = {
    headers: { Authorization: sessionStorage.getItem('jwt-token') }
}

export default function() {
	const [first_name, setFirstname] = useState(user.first_name)
	const [last_name, setLastname] = useState(user.last_name)
	const [username, setUsername] = useState(user.username)
	const [image, setImage] = useState({ id: null, path: user.image_path })
	const [imageLoading, setImageLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)
	const [errors, setErrors] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const dispatch = useDispatch()
	const nothingChanged = user.first_name === first_name &&
						   user.last_name === last_name &&
						   user.username === username &&
						   user.image_path === image.path

	useEffect(() => {
		return () => {
			if (user.image_path !== image.path) {
				axiosDelete(`/api/user/upload/delete-image?id=${image.id}`, axiosConfig)
			}
		}
	}, [image.path])

	const handleFirstnameValue = useCallback(event => {
		setFirstname(event.target.value)
	}, [first_name])

	const handleLastnameValue = useCallback(event => {
		setLastname(event.target.value)
	}, [last_name])

	const handleUsernameValue = useCallback(event => {
		setUsername(event.target.value)
	}, [username])

	function updateInfo(event) {
		event.preventDefault()

		setSubmitLoading(true)

		const requestBody = { first_name, last_name, username, image_path: image.path }

		axiosPut('/api/user/update', requestBody, axiosConfig)
			.then(() => {
				const { _id, gender } = user

				localStorage.setItem('user', JSON.stringify({ _id, gender, ...requestBody }))
				location.reload()
			})
			.catch(error => {
				setErrors(error.response.data)
				setSubmitLoading(false)
			})
	}

	function upload(event) {
		setImageLoading(true)

		const config = {headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: sessionStorage.getItem('jwt-token')
		}}
		
		const formData = new FormData()

		formData.append('image', event.target.files[0])

		axiosPost('/api/user/upload', formData, config)
			.then(({ data }) => {
				setImage(data)
				setImageLoading(false)
			})
			.catch(error => {
				setImageLoading(false)
			})
	}

	function cancel() {
		if (!(nothingChanged && user.image_path === image.path)) {
			dispatch(set('showCancelEditModeModal', true))
		}
		else {
			dispatch(set('editMode', false))
		}
	}

	return (
		<Fragment>
			<form className='full-width' onSubmit={updateInfo}>
				{
					imageLoading ? (
						<section className='text--center'>
							<div className='d--if ai--center jc--center round rightbar__avatar-container'>
								<Pulse size={30} />
							</div>
						</section>
					) : (
						<section className='text--center'>
							<div className='pos--rel d--ib round rightbar__avatar-container'>
								{
									!image.path && user.gender === 'Male' ? (
										<MaleDefaultAvatar />
									) : !image.path && user.gender === 'Female' ? (
										<FemaleDefaultAvatar />
									) : (
										<img className='d--block round rightbar__avatar' src={image.path} alt='Avatar' />
									)
								}

								{!submitLoading && (
									<label
										className='pos--abs d--flex ai--center jc--center font--xl round cursor--pointer rightbar__upload-button'
										htmlFor='file-input'>
										<i className='fa fa-camera text--white'></i>
									</label>
								)}

								{!submitLoading && (
									<input id='file-input' className='d--none' type='file' accept='.jpg,jpeg,.png' onChange={upload} />
								)}
							</div>
						</section>
					)
				}

				<UpdateFormInputField
					label='First name'
					value={first_name}
					disabled={submitLoading}
					onChange={handleFirstnameValue}
					error={(errors && errors.first_name) ? errors.first_name.properties.message : null}
					autoFocus
				/>
				
				<UpdateFormInputField
					label='Last name'
					value={last_name}
					disabled={submitLoading}
					onChange={handleLastnameValue}
					error={(errors && errors.last_name) ? errors.last_name.properties.message : null}
				/>

				<UpdateFormInputField
					label='Username'
					value={username}
					disabled={submitLoading}
					onChange={handleUsernameValue}
					error={(errors && errors.username) ? errors.username.properties.message : null}
				/>

				<button
					className='btn btn--blue full-width text--bold b-rad--sm pd-t--xs pd-b--xs mg-t--lg'
					disabled={submitLoading || nothingChanged}>
					Update
				</button>

				<button
					className='btn btn--secondary full-width text--bold b-rad--sm pd-t--xs pd-b--xs mg-t--md'
					type='button'
					disabled={submitLoading}
					onClick={cancel}>
					Cancel
				</button>
			</form>
		</Fragment>
	)
}