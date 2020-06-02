import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import ContactConversation from 'Components/main/ContactConversation'
import UsersList from 'Components/main/UsersList'

export default function() {
	const showSidebar = useSelector(state => state.showSidebar)
	
	return (
		<section className='pos--rel flex--1 main'>
			<Switch>
				<Route exact path='/home' children={<UsersList />} />
				<Route path='/home/contacts/:id' children={<ContactConversation />} />
			</Switch>

			{ showSidebar && <div className='pos--abs main__modal-overlay'></div> }
		</section>
	)
}