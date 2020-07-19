import React, { useState, useEffect, useRef, Fragment } from 'react'
import { Prompt } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { post as axiosPost } from 'axios'
import io from 'socket.io-client'
import { string, func } from 'prop-types'
import { push, update } from 'Actions'

const socket = io(`${process.env.APP_URL}/messages`)

function MessageBox({ convoId, userId, removeSeen }) {
	const [message, setMessage] = useState('')
	const [isBlocking, setBlocking] = useState(false)
	const dispatch = useDispatch()
	const textarea = useRef(null)

	useEffect(() => {
		return () => {
			setMessage('')
			setBlocking(false)
		}
	}, [convoId])

	function sendMessage() {
		const config = {
			headers: { Authorization: sessionStorage.getItem('jwt-token') }
		}
		const randomId = Math.floor(Math.random() * 1000000)
		const dummyData = { _id: randomId, body: message, isSelf: true }

		dispatch(push('messages', dummyData))
		setMessage('')
		textarea.current.value = ''

		axiosPost('/api/messages/store', { id: convoId, message }, config)
			.then(({ data }) => {
				dispatch(update('messages', randomId, data.message))
				socket.emit('send message', { id: userId, message: data.message })
			})
			.catch(() => {
				dispatch(update('messages', randomId, { ...dummyData, notSent: true }))
			})
	}

	function checkPressedKey(event) {
		if ((event.keyCode === 13 || event.key === 'Enter') && !event.shiftKey) {
			if (!message.trim().length) return;

			event.preventDefault()
			sendMessage()
			removeSeen()
		}

		return
	}

	function handleValue(event) {
		setMessage(event.target.value)
	}

	return (
		<Fragment>
			<section className='pos--sticky main__message-container'>
				<textarea
					ref={textarea}
					className='full-width bt--1 b--gray-60 pd--sm main__message-box'
					placeholder='Write your message here'
					value={message}
					onChange={handleValue}
					onKeyPress={checkPressedKey}>
				</textarea>
			</section>

			<Prompt when={!!message.length} message="You haven't send your message yet. Proceed?" />
		</Fragment>
	)
}

MessageBox.propTypes = {
	convoId: string.isRequired,
	userId: string.isRequired,
	removeSeen: func.isRequired
}

export default MessageBox