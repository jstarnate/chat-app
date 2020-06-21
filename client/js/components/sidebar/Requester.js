import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import io from 'socket.io-client'
import { post as axiosPost } from 'axios'
import { string, func } from 'prop-types'
import { remove } from 'Actions'
import MaleDefaultAvatar from 'Utilities/MaleDefaultAvatar'
import FemaleDefaultAvatar from 'Utilities/FemaleDefaultAvatar'
import Spinner from 'Utilities/Spinner'

const socket = io(`${process.env.APP_URL}/contacts`)
const axiosConfig = {
    headers: { Authorization: sessionStorage.getItem('jwt-token') }
}

function Requester({ _id, first_name, last_name, gender, image_path }) {
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	const userId = JSON.parse(localStorage.getItem('user'))._id

	function accept() {
		setLoading(true)

		axiosPost('/api/user/contacts/accept', { id: _id }, axiosConfig)
			.then(response => {
				dispatch(remove('requests', _id))
				socket.emit('request accepted', { authUserId: userId, requesterId: _id })
			})
			.catch(() => {
				setLoading(false)
			})
	}

	function removeRequest() {
		setLoading(true)

		axiosPost('/api/user/contacts/remove_request', { id: _id }, axiosConfig)
			.then(response => {
				dispatch(remove('requests', _id))
				socket.emit('request removed', userId)
			})
			.catch(() => {
				setLoading(false)
			})
	}

	return (
		<div className='d--flex ai--center pd--md sidebar__list-item'>
            {
				!image_path && gender === 'Male' ? (
					<MaleDefaultAvatar size={35} />
				) : !image_path && gender === 'Female' ? (
					<FemaleDefaultAvatar size={35} />
				) : (
					<img className='d--block round sidebar__avatar' src={image_path} alt='Avatar' />
				)
			}
            
            <label className='d--block font--md text--bold mg-l--md'>{first_name} {last_name}</label>

            {
            	loading ?
            	<Spinner className='mg-l--auto' size='20px' /> :
	            <div className='mg-l--auto'>
	                <button
	                	className='btn btn--blue text--bold curved pd-t--xs pd-b--xs pd-l--sm pd-r--sm'
	                	onClick={accept}>
	                    <i className='fa fa-plus text--white'></i>
	                </button>
	                <button
	                	className='btn btn--secondary text--bold curved pd-t--xs pd-b--xs pd-l--sm pd-r--sm mg-l--sm'
	                	onClick={removeRequest}>
	                    <i className='fa fa-trash'></i>
	                </button>
	            </div>
            }
        </div>
	)
}

Requester.propTypes = {
	_id: string.isRequired,
	first_name: string.isRequired,
	last_name: string.isRequired,
	gender: string.isRequired,
	image_path: string
}

export default Requester