import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { string, func } from 'prop-types'
import { post as axiosPost } from 'axios'
import io from 'socket.io-client'
import MaleDefaultAvatar from 'Utilities/MaleDefaultAvatar'
import FemaleDefaultAvatar from 'Utilities/FemaleDefaultAvatar'
import Spinner from 'Utilities/Spinner'
import { add } from 'Actions'

const socket = io(`${process.env.APP_URL}/contacts`)

function User({ _id, first_name, last_name, username, gender, image_path, removeEvent }) {
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const dispatch = useDispatch()

	function requestChat() {
		const config = {
            headers: { Authorization: sessionStorage.getItem('jwt-token') }
        }

		setLoading(true)

		axiosPost('/api/user/contacts/add', { id: _id }, config)
			.then(({ data }) => {
				socket.emit('added to contacts', {
					adderId: JSON.parse(localStorage.getItem('user'))._id,
					addedId: _id
				})

				dispatch(add('contacts', data.contact))
				setSuccess(true)
				setLoading(false)

				setTimeout(() => {
					removeEvent(_id)
				}, 1000)
			})
			.catch(error => {
				if (error.response.status === 400) {
					removeEvent(_id)
				}
				else {
					setSuccess(false)
					setLoading(false)
				}
			})
	}

	return (
		<div className='d--flex ai--center b--1 b--gray-40 b-rad--md pd--sm main__user'>
			{
				!image_path && gender === 'Male' ? (
					<MaleDefaultAvatar size={40} />
				) : !image_path && gender === 'Female' ? (
					<FemaleDefaultAvatar size={40} />
				) : (
					<img className='d--block round main__user-image' src={image_path} alt='Avatar' />
				)
			}

			<div className='mg-l--xs'>
				<span className='d--block text--bold'>{first_name} {last_name}</span>
				<span className='d--block text--gray-20'>{username}</span>
			</div>

			{
				loading ? (
					<Spinner className='mg-l--auto mg-r--sm' size='20px' />
				) : !loading && success ? (
					<span className='mg-l--auto mg-r--sm' title='Request to chat'>
						<i className='fa fa-check font--lg text--blue'></i>
					</span>
				) : (
					<button
						className='btn btn--blue b-rad--sm pd-t--xs pd-b--xs pd-l--sm pd-r--sm mg-l--auto'
						title='Send chat request'
						onClick={requestChat}>
						<i className='fa fa-user-plus text--white'></i>
					</button>
				)
			}
		</div>
	)
}

User.propTypes = {
	_id: string.isRequired,
	first_name: string.isRequired,
	last_name: string.isRequired,
	username: string.isRequired,
	gender: string.isRequired,
	image_path: string,
	removeEvent: func.isRequired
}

export default User