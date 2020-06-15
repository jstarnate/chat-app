import React, { useState, useEffect, useRef, Fragment } from 'react'
import { Prompt, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get as axiosGet } from 'axios'
import socket from 'socket.io-client'
import Messages from './Messages'
import CommentBox from './CommentBox'
import Spinner from 'Utilities/Spinner'
import { set, push } from 'Actions'

const io = socket(`${process.env.APP_URL}/messages`)

export default function () {
	const messages = useSelector(state => state.messages)
	const [loading, setLoading] = useState(false)
	const [user, setUser] = useState(null)
	const dispatch = useDispatch()
	const { id } = useParams()
	const messagesContainer = useRef(null)

	useEffect(() => {
		getUserAndMessages()
		dispatch(set('showSidebar', false))
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
			<header className='pos--sticky bg--pale bb--1 b--gray-60 pd--md main__header'>
				<h4 className='d--ib'>{user}</h4>
				<span className='d--ib bg--blue round mg-l--sm main__presence'></span>
			</header>

			{
				!!messages.length ?
				<Messages ref={messagesContainer} messages={messages} /> :
				<section className='flex--1 pd-l--md pd-r--md main__conversation' />
			}

			<CommentBox id={id} />
		</Fragment>
	)
}
