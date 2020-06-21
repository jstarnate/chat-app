import React, { useState, useEffect, useRef, Fragment } from 'react'
import { Prompt } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { post as axiosPost } from 'axios'
import io from 'socket.io-client'
import { string } from 'prop-types'
import { push } from 'Actions'

const socket = io(`${process.env.APP_URL}/messages`)

function MessageBox({ id }) {
	const [message, setMessage] = useState('')
	const [isBlocking, setBlocking] = useState(false)
	const dispatch = useDispatch()
	const textarea = useRef(null)

	useEffect(() => {
		return () => {
			setMessage('')
			setBlocking(false)
		}
	}, [id])

	function sendMessage() {
		const config = {
			headers: { Authorization: sessionStorage.getItem('jwt-token') }
		}

		axiosPost('/api/messages/store', { id, message }, config)
			.then(({ data }) => {
				dispatch(push('messages', data.message))
				socket.emit('send message', { id, message: data.message })
				setMessage('')
				textarea.current.value = ''
			})
			.catch(() => {
				console.log('An error occured while sending your message.')
			})
	}

	function checkPressedKey(event) {
		if ((event.keyCode === 13 || event.key === 'Enter') && !event.shiftKey) {
			if (!message.trim().length) return;

			event.preventDefault()
			sendMessage()
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
	id: string.isRequired
}

export default MessageBox