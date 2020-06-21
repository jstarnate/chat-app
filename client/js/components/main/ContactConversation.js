import React, { useState, useEffect, useRef, Fragment } from 'react'
import { Prompt, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get as axiosGet } from 'axios'
import io from 'socket.io-client'
import Messages from './Messages'
import MessageBox from './MessageBox'
import MaleDefaultAvatar from 'Utilities/MaleDefaultAvatar'
import FemaleDefaultAvatar from 'Utilities/FemaleDefaultAvatar'
import Spinner from 'Utilities/Spinner'
import { set, push } from 'Actions'

const socket = io(`${process.env.APP_URL}/messages`)

export default function () {
	const messages = useSelector(state => state.messages)
	const [loading, setLoading] = useState(false)
	const [user, setUser] = useState({})
	const dispatch = useDispatch()
	const { id } = useParams()
	const messagesContainer = useRef(null)

	useEffect(() => {
		getUserAndMessages()
		dispatch(set('showSidebar', false))
	}, [id])

	useEffect(() => {
		const { _id } = JSON.parse(localStorage.getItem('user'))
		
		socket.on(`receive message ${_id}`, (body) => {
			dispatch(push('messages', body))
		})

		return () => {
			socket.disconnect()
		}
	}, [])

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	function scrollToBottom() {
		if (messagesContainer.current && messagesContainer.current.scrollHeight > messagesContainer.current.clientHeight) {
			messagesContainer.current.scrollTo(0, messagesContainer.current.scrollHeight)
		}
	}

	function getUserAndMessages() {
		const config = {
			headers: { Authorization: sessionStorage.getItem('jwt-token') }
		}

		setLoading(true)

		axiosGet(`/api/messages?id=${id}`, config)
			.then(({ data }) => {
				setUser(data.user)
				dispatch(set('messages', data.messages))
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
						<MaleDefaultAvatar size={29} />
					) : !user.image_path && user.gender === 'Female' ? (
						<FemaleDefaultAvatar size={29} />
					) : <img className='round' src={user.image_path} />
				}

				<h4 className='mg-l--sm'>{user.first_name} {user.last_name}</h4>
			</header>

			{
				!!messages.length ?
				<Messages ref={messagesContainer} messages={messages} /> :
				<section className='flex--1 pd-l--md pd-r--md main__conversation' />
			}

			<MessageBox id={id} />
		</Fragment>
	)
}
