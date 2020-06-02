import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import socket from 'socket.io-client'
import { get as axiosGet } from 'axios'
import MaleDefaultAvatar from 'Utilities/MaleDefaultAvatar'
import FemaleDefaultAvatar from 'Utilities/FemaleDefaultAvatar'
import Spinner from 'Utilities/Spinner'
import { set, add } from 'Actions'

const localStorageUser = JSON.parse(localStorage.getItem('user'))
const io = socket(`${process.env.APP_URL}/contacts`)

export default function() {
	const [loading, setLoading] = useState(false)
	const [finished, setFinished] = useState(null)
	const [userId, setUserId] = useState(null)
	const contacts = useSelector(state => state.contacts)
	const dispatch = useDispatch()
	let isMounted = false

	useEffect(() => {
		isMounted = true

		if (!contacts) {
			getContacts()
		}
		else {
			setFinished(true)
		}

		getUserId()
		initializeSocket()

		return () => {
			io.disconnect()
			isMounted = false
		}
	}, [])

	function getUserId() {
		if (localStorageUser) {
			setUserId(localStorageUser._id)
		}
		else {
			axiosGet('/api/user').then(({ data }) => {
				setUserId(data.user._id)
			})
		}
	}

	function getContacts() {
		setLoading(true)
		setFinished(false)

		axiosGet('/api/user/contacts')
			.then(({ data }) => {
				if (isMounted) {
					dispatch(set('contacts', data.contacts))
					setLoading(false)
					setFinished(true)
				}
			})
			.catch(() => {
				setLoading(false)
				setFinished(null)
			})
	}

	function initializeSocket() {
		io.on(`add to contacts ${userId}`, (user) => {
			dispatch(add('contacts', user))
		})
	}

	return (
		<Fragment>
			{loading && <Spinner className='mg-t--sm' />}

			{(!loading && finished && !contacts.length) && (
				<p className='font--lg text--gray-20 text--bold text--center pd--md'>
					You don't have any contact.
				</p>
			)}

			{(!loading && finished && !!contacts.length) && (
				<section>
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
							<span className='bg--blue round mg-l--auto sidebar__right-side'></span>
						</NavLink>
					))}
				</section>
			)}
		</Fragment>
	)
}