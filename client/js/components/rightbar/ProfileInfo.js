import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { get as axiosGet } from 'axios'
import { func } from 'prop-types'
import { set } from 'Actions'
import MaleDefaultAvatar from 'Utilities/MaleDefaultAvatar'
import FemaleDefaultAvatar from 'Utilities/FemaleDefaultAvatar'
import Spinner from 'Utilities/Spinner'

const localStorageUser = JSON.parse(localStorage.getItem('user'))

function ProfileInfo({ clickEvent }) {
	const [user, setUser] = useState({})
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		if (localStorageUser)
			setUser(localStorageUser)
		else
			getUser()
	}, [])

	function getUser() {
		setLoading(true)

		axiosGet('/api/user')
			.then(({ data }) => {
				setUser(data.user)
				setLoading(false)
			})
			.catch(() => {
				setLoading(false)
			})
	}

	function confirmSignout() {
		dispatch(set('showLogoutModal', true))
	}


	if (loading) {
		return <Spinner />
	}

	return (
		<Fragment>
			<div className='text--center'>
				<div className='d--ib round rightbar__avatar-container'>
					{
						!user.image_path && user.gender === 'Male' ? (
							<MaleDefaultAvatar />
						) : !user.image_path && user.gender === 'Female' ? (
							<FemaleDefaultAvatar />
						) : (
							<img className='d--block round rightbar__avatar' src={user.image_path} alt='Avatar' />
						)
					}
				</div>
			</div>

			<div className='mg-t--md'>
				<label className='text--gray-20'>Name</label>
				<p className='text--bold mg-t--xs mg-b--auto'>{user.first_name} {user.last_name}</p>
			</div>

			<div className='mg-t--md'>
				<label className='text--gray-20'>Username</label>
				<p className='text--bold mg-t--xs mg-b--auto'>{user.username}</p>
			</div>

			<button className='btn btn--blue full-width text--bold b-rad--sm pd-t--xs pd-b--xs mg-t--lg' onClick={clickEvent}>
				Edit info
			</button>

			<button className='btn btn--secondary full-width b-rad--sm pd-t--xs pd-b--xs mg-t--md' onClick={confirmSignout}>
				Sign out
			</button>
		</Fragment>
	)
}

ProfileInfo.propTypes = {
	clickEvent: func.isRequired
}

export default ProfileInfo