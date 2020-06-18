import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { get as axiosGet } from 'axios'
import socket from 'socket.io-client'
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
	const [width, setWidth] = useState(null)
	const showSidebar = useSelector(state => state.showSidebar)
	const showRightbar = useSelector(state => state.showRightbar)
	const dispatch = useDispatch()
	const io = socket(`${process.env.APP_URL}/contacts`) // TODO: If fails, add { reconnection: false }

	useEffect(() => {
		if (!localStorage.getItem('user')) {
			axiosGet('/api/user')
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

	return (
		<Fragment>
			<Header />

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
