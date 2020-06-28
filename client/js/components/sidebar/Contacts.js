import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import socket from 'socket.io-client'
import { get as axiosGet, post as axiosPost } from 'axios'
import MaleDefaultAvatar from 'Utilities/MaleDefaultAvatar'
import FemaleDefaultAvatar from 'Utilities/FemaleDefaultAvatar'
import Spinner from 'Utilities/Spinner'
import { add, push, updateStatus } from 'Actions'

const axiosConfig = {
    headers: { Authorization: sessionStorage.getItem('jwt-token') }
}

export default function() {
	const [userId, setUserId] = useState(null)
	const [loading, setLoading] = useState(false)
	const [date, setDate] = useState(null)
	const contacts = useSelector(state => state.contacts)
	const dispatch = useDispatch()
	const container = useRef(null)
	const target = useRef(null)
	const io = socket(`${process.env.APP_URL}/contacts`)

	const ioCallback = useCallback((entries, observer) => {
		if (entries[0].isIntersecting) {
			setLoading(true)

			axiosPost('/api/user/contacts', { date }, axiosConfig)
				.then(({ data }) => {
					if (data.contacts.length) {
						dispatch(push('contacts', data.contacts))
						setDate(data.date)
					}
					else {
						observer.unobserve(target.current)
					}

					setLoading(false)
				})
		}
	}, [contacts, date])

	useEffect(() => {
		if (localStorage.getItem('user')) {
			const id = JSON.parse(localStorage.getItem('user'))._id
			
			setUserId(id)
			io.emit('user connects', id)
		}
		else {
			axiosGet('/api/user', axiosConfig)
				.then(({ data }) => {
					setUserId(data.user._id)
					io.emit('user connects', data.user._id)
				})
		}
	}, [])

	useEffect(() => {
		io.on('online user', (id) => {
			if (contacts.find(contact => contact._id === id)) {
				dispatch(updateStatus(id, true))
			}
		})

		io.on('offline user', (id) => {
			dispatch(updateStatus(id, false))
		})

		io.on('add to contacts', (data) => {
			if (userId !== data.requester._id) {
				dispatch(add('contacts', data.requester))
			}

			if (userId !== data.acceptor._id) {
				dispatch(add('contacts', data.acceptor))
			}
		})
	}, [contacts])

	useEffect(() => {
		const options = {
			root: container.current,
			rootMargin: '0px',
			threshold: 1.0
		}

		const observer = new IntersectionObserver(ioCallback, options)

		if (target && target.current) {
			observer.observe(target.current)
		}

		return () => {
			observer.disconnect()
		}
	}, [ioCallback])


	return (
		<Fragment>
			<section ref={container} className='sidebar__contacts'>
				{contacts.map(contact => (
					<NavLink
						key={contact._id}
						to={`/home/contacts/${contact._id}`}
						className='d--flex ai--center pd--md sidebar__list-item'
						activeClassName='active'>
						{
							!contact.image_path && contact.gender === 'Male' ? (
								<MaleDefaultAvatar size={35} />
							) : !contact.image_path && contact.gender === 'Female' ? (
								<FemaleDefaultAvatar size={35} />
							) : (
								<img className='d--block round sidebar__avatar' src={contact.image_path} alt='Avatar' />
							)
						}
						
						<span className='text--bold mg-l--sm sidebar__item-info'>{contact.first_name} {contact.last_name}</span>
						{ contact.online && <span className='bg--blue round mg-l--auto sidebar__right-side'></span> }
					</NavLink>
				))}

				<div ref={target}></div>

				{ loading && <Spinner className='mg-t--sm' /> }
			</section>

			{(!loading && !contacts.length) && (
				<p className='font--lg text--gray-20 text--bold text--center pd--md'>
					You don't have any contact.
				</p>
			)}
		</Fragment>
	)
}