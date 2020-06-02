import React, { useState, useEffect, useCallback } from 'react'
import socket from 'socket.io-client'
import { post as axiosPost } from 'axios'
import { string, func } from 'prop-types'
import MaleDefaultAvatar from 'Utilities/MaleDefaultAvatar'
import FemaleDefaultAvatar from 'Utilities/FemaleDefaultAvatar'
import Spinner from 'Utilities/Spinner'

const user = JSON.parse(localStorage.getItem('user'))
const io = socket(`${process.env.APP_URL}/contacts`)

function Requester({ _id, first_name, last_name, gender, image_path, removeEvent }) {
	const [loading, setLoading] = useState(false)

	const acceptOrRemove = useCallback((url, channelName, data) => {
		setLoading(true)

		axiosPost(url, { id: _id })
			.then(({ data }) => {
				io.emit(channelName, data)
				removeEvent(_id)
			})
			.catch(() => {
				setLoading(false)
			})
	}, [])

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
	                	onClick={acceptOrRemove.bind(null, '/api/user/contacts/accept', 'request accepted', {
							authUserId: user._id,
							requesterId: _id
						})}>
	                    <i className='fa fa-plus text--white'></i>
	                </button>
	                <button
	                	className='btn btn--secondary text--bold curved pd-t--xs pd-b--xs pd-l--sm pd-r--sm mg-l--sm'
	                	onClick={acceptOrRemove.bind(null, '/api/user/contacts/remove_request', 'request removed', user._id)}>
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
	image_path: string,
	removeEvent: func.isRequired
}

export default Requester