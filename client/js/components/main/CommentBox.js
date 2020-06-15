import React, { useState, useEffect, useRef, Fragment } from 'react'
import { Prompt } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { post as axiosPost } from 'axios'
import socket from 'socket.io-client'
import { string } from 'prop-types'
import { push } from 'Actions'

const io = socket(`${process.env.APP_URL}/messages`)

function CommentBox({ id }) {
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
		axiosPost('/api/messages/store', { id, message })
			.then(({ data }) => {
				dispatch(push('messages', data.message))
				io.emit('send message', { id, message: data.message })
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

CommentBox.propTypes = {
	id: string.isRequired
}

export default CommentBox