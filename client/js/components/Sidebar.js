import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import io from 'socket.io-client'
import { get as axiosGet, post as axiosPost } from 'axios'
import MaleDefaultAvatar from 'Utilities/MaleDefaultAvatar'
import FemaleDefaultAvatar from 'Utilities/FemaleDefaultAvatar'
import Spinner from 'Utilities/Spinner'
import { add, push, update } from 'Actions'

const axiosConfig = {
    headers: { Authorization: sessionStorage.getItem('jwt-token') }
}

export default function() {
	const [date, setDate] = useState(new Date())
	const [userId, setUserId] = useState(null)
	const [loading, setLoading] = useState(false)
	const contacts = useSelector(state => state.contacts)
	const showSidebar = useSelector(state => state.showSidebar)
	const dispatch = useDispatch()
	const container = useRef(null)
	const target = useRef(null)
	const socket = io(`${process.env.APP_URL}/contacts`)

	const ioCallback = useCallback((entries, observer) => {
		if (entries[0].isIntersecting) {
			setLoading(true)

			axiosPost('/api/user/contacts', { date }, axiosConfig)
				.then(({ data }) => {
					if (data.contacts.length) {
						dispatch(push('contacts', data.contacts))
					}
					else {
						observer.unobserve(target.current)
					}

					setDate(data.date)
					setLoading(false)
				})
		}
	}, [date])

	function toggleStatus(id, status) {
		const contact = contacts.find(contact => contact.user._id === id)
		
		if (contact) {
			const { online, ...user } = contact.user

			dispatch(update('contacts', contact._id, {
				_id: contact._id,
				user: { ...user, online: status },
				createdAt: contact.createdAt
			}))
		}
	}

	useEffect(() => {
		if (localStorage.getItem('user')) {
			const id = JSON.parse(localStorage.getItem('user'))._id
			
			setUserId(id)
			socket.emit('user connects', id)
		}
		else {
			axiosGet('/api/user', axiosConfig)
				.then(({ data }) => {
					setUserId(data.user._id)
					socket.emit('user connects', data.user._id)
				})
		}
	}, [])

	useEffect(() => {
		socket.on('add to contacts', (data) => {
			if (data.id === userId) {
				dispatch(add('contacts', data.contact))
			}
		})
	}, [userId])

	useEffect(() => {
		socket.on('online user', (id) => {
			toggleStatus(id, true)
		})

		socket.on('offline user', (id) => {
			toggleStatus(id, false)
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
		<aside className='sidebar'>
			<div className={`pos--fixed bg--white br--1 b--gray-60 sidebar__wrap ${showSidebar ? 'show' : ''}`}>
				<h3 className='d--flex ai--center jc--between pd--md'>
					<span className='text--blue'>Conversations</span>
					<span className='text--blue'>{contacts.length}</span>
				</h3>
				
				<section ref={container} className='sidebar__contacts'>
					{contacts.map(({ _id, user }) => (
						<NavLink
							key={_id}
							to={`/home/contacts/${_id}/${user._id}`}
							className='d--flex ai--center pd--md sidebar__list-item'
							activeClassName='active'>
							{
								!user.image_path && user.gender === 'Male' ? (
									<MaleDefaultAvatar size={35} />
								) : !user.image_path && user.gender === 'Female' ? (
									<FemaleDefaultAvatar size={35} />
								) : (
									<img className='d--block round sidebar__avatar' src={user.image_path} alt='Avatar' />
								)
							}
							
							<span className='text--bold mg-l--sm sidebar__item-info'>{user.first_name} {user.last_name}</span>
							{ user.online && <span className='bg--blue round mg-l--auto sidebar__right-side'></span> }
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
			</div>
		</aside>
	)
}