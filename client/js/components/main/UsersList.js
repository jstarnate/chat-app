import React, { useState, useEffect } from 'react'
import { get as axiosGet } from 'axios'
import Spinner from 'Utilities/Spinner'
import User from './User'

export default function() {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(false)
	
	useEffect(() => {
		getUsers()
	}, [])

	function getUsers() {
		setLoading(true)

		axiosGet('/api/user/all')
			.then(({ data }) => {
				setUsers(data.users)
				setLoading(false)
			})
			.catch(() => {
				setLoading(false)
			})
	}

	function removeUser(id) {
		const filtered = users.filter(user => user._id !== id)
		setUsers(filtered)
	}

	if (loading) {
		return <Spinner className='mg-t--md' />
	}

	if (!loading && !users.length) {
		return <h2 className='text--center'>No users</h2>
	}

	return (
		<section className='pd--md main__users'>
			{users.map(user => (
				<User key={user._id} removeEvent={removeUser} refreshEvent={getUsers} {...user} />
			))}
		</section>
	)
}