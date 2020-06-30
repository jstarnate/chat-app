import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import ContactConversation from 'Components/main/ContactConversation'
import UsersList from 'Components/main/UsersList'

export default function() {
	const showSidebar = useSelector(state => state.showSidebar)
	const showRightbar = useSelector(state => state.showRightbar)
	
	return (
		<section className='pos--rel flex--1 main'>
			<Switch>
				<Route exact path='/home' children={<UsersList />} />
				<Route path='/home/contacts' children={<ContactConversation />} />
			</Switch>

			{ (showSidebar || showRightbar) && <div className='pos--abs main__modal-overlay'></div> }
		</section>
	)
}