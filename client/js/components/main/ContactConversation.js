import React, { useState, useEffect, useRef, Fragment } from 'react'
import { Prompt, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get as axiosGet, post as axiosPost } from 'axios'
import io from 'socket.io-client'
import Messages from './Messages'
import MessageBox from './MessageBox'
import MaleDefaultAvatar from 'Utilities/MaleDefaultAvatar'
import FemaleDefaultAvatar from 'Utilities/FemaleDefaultAvatar'
import Spinner from 'Utilities/Spinner'
import { set, push } from 'Actions'

const socket = io(`${process.env.APP_URL}/messages`)
const axiosConfig = {
	headers: { Authorization: sessionStorage.getItem('jwt-token') }
}

export default function () {
	const messages = useSelector(state => state.messages)
	const [loading, setLoading] = useState(false)
	const [user, setUser] = useState({})
	const dispatch = useDispatch()
	const location = useLocation()
	const query = new URLSearchParams(location.search)
	const messagesContainer = useRef(null)

	useEffect(() => {
		getContactInfoAndMessages()
		dispatch(set('showSidebar', false))
	}, [location])

	useEffect(() => {
		const { _id } = JSON.parse(localStorage.getItem('user'))
		
		socket.on(`receive message ${_id}`, (body) => {
			dispatch(push('messages', body))
		})
	}, [])

	useEffect(() => {
		scrollToBottom()
	}, [messages])


	function scrollToBottom() {
		if (messagesContainer.current && messagesContainer.current.scrollHeight > messagesContainer.current.clientHeight) {
			messagesContainer.current.scrollTo(0, messagesContainer.current.scrollHeight)
		}
	}

	function getContactInfoAndMessages() {
		setLoading(true)

		Promise.all([
			axiosGet(`/api/user/contact-info?id=${query.get('userId')}`, axiosConfig),
			axiosPost('/api/messages', { id: query.get('convoId'), date: new Date() }, axiosConfig)
		])
		.then(([infoResponse, messagesResponse]) => {
			setUser(infoResponse.data.user)
			dispatch(set('messages', messagesResponse.data.messages))
			setLoading(false)
			scrollToBottom()
		})
	}


	if (loading) {
		return (
			<Fragment>
				<header className='pos--sticky bg--pale bb--1 b--gray-60 pd--md main__header'>
					<div className='bg--gray-60 main__name-placeholder'></div>
				</header>

				<Spinner className='mg-t--md' />
			</Fragment>
		)
	}

	return (
		<Fragment>
			<header className='pos--sticky d--flex ai--center bg--pale bb--1 b--gray-60 pd--sm main__header'>
				{
					!user.image_path && user.gender === 'Male' ? (
						<MaleDefaultAvatar size={33} />
					) : !user.image_path && user.gender === 'Female' ? (
						<FemaleDefaultAvatar size={33} />
					) : <img className='round' src={user.image_path} />
				}

				<h4 className='mg-l--sm'>{user.first_name} {user.last_name}</h4>
			</header>

			<Messages ref={messagesContainer} />
			<MessageBox id={query.get('userId')} />
		</Fragment>
	)
}
