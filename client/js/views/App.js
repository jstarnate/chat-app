import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { get as axiosGet, post as axiosPost } from 'axios'
import socket from 'socket.io-client'
import { set } from 'Actions'
import Header from 'Components/Header'
import Sidebar from 'Components/Sidebar'
import Rightbar from 'Components/Rightbar'
import Main from 'Components/Main'
import Modal from 'Components/Modal'

const axiosConfig = {
	headers: { Authorization: sessionStorage.getItem('jwt-token') }
}

export default function() {
	const [width, setWidth] = useState(null)
	const [signoutLoading, setSignoutLoading] = useState(false)
	const showSidebar = useSelector(state => state.showSidebar)
	const showRightbar = useSelector(state => state.showRightbar)
	const dispatch = useDispatch()
	const io = socket(`${process.env.APP_URL}/contacts`)

	useEffect(() => {
		if (!localStorage.getItem('user')) {
			axiosGet('/api/user', axiosConfig)
				.then(({ data }) => {
					localStorage.setItem('user', JSON.stringify(data.user))
					io.emit('user connects', data.user._id)
				})
				.catch(err => {
					console.error(err)
				})
		}

		applyViewportWidth()
		window.addEventListener('resize', applyViewportWidth)
	}, [])

	useEffect(() => {
		if (width > 768 && showSidebar) {
			dispatch(set('showSidebar', false))
		}

		if (width > 768 && showRightbar) {
			dispatch(set('showRightbar', false))
		}
	}, [width, showSidebar, showRightbar])


	function applyViewportWidth() {
		setWidth(window.innerWidth)
	}

	function closeEditModeModal() {
		dispatch(set('showCancelEditModeModal', false))
	}

	function cancelEditMode() {
		dispatch(set('editMode', false))
		closeEditModeModal()
	}

	function closeSignoutModal() {
		dispatch(set('showLogoutModal', false))
	}

	function signOut() {
		setSignoutLoading(true)

		axiosPost('/logout', null, axiosConfig)
			.then(response => {
				localStorage.clear()
				sessionStorage.clear()
				
				location = '/index'
			})
			.catch(error => {
				setSignoutLoading(false)
			})
	}

	return (
		<Fragment>
			<Header />

			<section data-testid='container' className='d--flex'>
				<Sidebar />
				<Main />
				<Rightbar />
			</section>

			<Modal name='showCancelEditModeModal' prompt='Are you sure you want to cancel?'>
				<Fragment>
					<button className='btn btn--secondary curved pd-t--xs pd-b--xs pd-l--md pd-r--md' onClick={closeEditModeModal}>No</button>
					<button className='btn btn--danger text--bold curved pd-t--xs pd-b--xs pd-l--md pd-r--md mg-l--sm' onClick={cancelEditMode}>Yes</button>
				</Fragment>
			</Modal>

			<Modal name='showLogoutModal' prompt='Are you sure you want to sign out?'>
				<Fragment>
					<button
						className='btn btn--secondary curved pd-t--xs pd-b--xs pd-l--md pd-r--md'
						disabled={signoutLoading}
						onClick={closeSignoutModal}>
						Cancel
					</button>
					
					<button
						className='btn btn--blue text--bold curved pd-t--xs pd-b--xs pd-l--md pd-r--md mg-l--sm'
						disabled={signoutLoading}
						onClick={signOut}>
						Sign out
					</button>
				</Fragment>
			</Modal>
		</Fragment>
	)
}
