import React, { useState, useEffect, useRef, Fragment } from 'react'
import { Prompt, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get as axiosGet, post as axiosPost } from 'axios'
import socket from 'socket.io-client'
import { set, push } from 'Actions'
import Spinner from 'Utilities/Spinner'

const io = socket(`${process.env.APP_URL}/messages`)

export default function () {
	const messages = useSelector(state => state.messages)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')
	const [user, setUser] = useState(null)
	const [isBlocking, setBlocking] = useState(false)
	const dispatch = useDispatch()
	const { id } = useParams()
	const textarea = useRef(null)
	const messagesContainer = useRef(null)

	useEffect(() => {
		getUserAndMessages()
		dispatch(set('showSidebar', false))

		return () => {
			setMessage('')
			setBlocking(false)
		}
	}, [id])

	useEffect(() => {
		const { _id } = JSON.parse(localStorage.getItem('user'))

		io.on(`receive message ${_id}`, (body) => {
			dispatch(push('messages', body))
		})

		return () => {
			io.disconnect()
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
		setLoading(true)

		axiosGet(`/api/messages?id=${id}`)
			.then(({ data }) => {
				setUser(data.user)
				dispatch(set('messages', data.messages))
				setLoading(false)

				scrollToBottom()
			})
	}

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

	function checkPressedKey(e) {
		if ((e.keyCode === 13 || e.key === 'Enter') && !e.shiftKey) {
			if (!message.trim().length) return;

			e.preventDefault()
			sendMessage()
		}

		return
	}

	function handleValue(e) {
		setMessage(e.target.value)
	}

	return (
		<Fragment>
			{
				loading ?
				<header className='pos--sticky bg--pale bb--1 b--gray-60 pd--md main__header'>
					<div className='bg--gray-60 main__name-placeholder'></div>
				</header> :
				<header className='pos--sticky bg--pale bb--1 b--gray-60 pd--md main__header'>
					<h4 className='d--ib'>{user}</h4>
					<span className='d--ib bg--blue round mg-l--sm main__presence'></span>
				</header>
			}

			{ loading && <Spinner className='mg-t--md' /> }

			{(!loading && !!!messages.length) &&
				<section className='flex--1 pd-l--md pd-r--md main__conversation' />
			}

			{(!loading && !!messages.length) &&
				<section ref={messagesContainer} className='flex--1 pd-l--md pd-r--md main__conversation'>
					{messages.map(({ _id, body, isSelf, timestamp }) => (
						<div key={_id} className={`pd-t--sm pd-b--sm ${isSelf ? 'text--right' : 'text--left'}`}>
							<span className='d--block font--sm text--gray-20'>{timestamp}</span>
							<p className={`d--ib ${isSelf ? 'bg--blue text--white text--right' : 'bg--gray-60 text--black text--left'} b-rad--md pd--sm main__message`}>
								{body}
							</p>
						</div>
					))}
				</section>
			}

			{!loading && (
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
			)}

			<Prompt when={!!message.length} message="You haven't send your message yet. Proceed?" />
		</Fragment>
	)
}
