import React, { useEffect, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { get as axiosGet } from 'axios'
import { set } from 'Actions'
import Header from 'Components/Header'
import Sidebar from 'Components/Sidebar'
import Rightbar from 'Components/Rightbar'
import Main from 'Components/Main'
import Modal from 'Components/Modal'

function clearLocalStorage() {
	localStorage.clear()
}

export default function() {
	const dispatch = useDispatch()

	useEffect(() => {
		axiosGet('/api/user')
			.then(({ data }) => {
				localStorage.setItem('user', JSON.stringify(data.user))
			})
			.catch(err => {
				console.error(err)
			})
	}, [])

	function confirmSignout() {
		dispatch(set('showSidebar', false))
		dispatch(set('showRightbar', false))
		dispatch(set('showLogoutModal', true))
	}

	return (
		<Fragment>
			<Header confirmSignout={confirmSignout} />

			<section data-testid='container' className='d--flex'>
				<Sidebar />
				<Main />
				<Rightbar />
			</section>

			<Modal name='showDeleteModal' prompt='Are you sure you want to delete remove the contact?'>
				<button className='btn btn--danger text--bold curved pd-t--xs pd-b--xs pd-l--md pd-r--md mg-l--sm'>Remove</button>
			</Modal>

			<Modal name='showLogoutModal' prompt='Are you sure you want to sign out?'>
				<a
					href='/logout'
					className='btn btn--blue text--bold curved pd-t--xs pd-b--xs pd-l--md pd-r--md mg-l--sm'
					onClick={clearLocalStorage}>
					Sign out
				</a>
			</Modal>
		</Fragment>
	)
}
