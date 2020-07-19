import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import UsersList from 'Components/main/UsersList'
import useLazyLoad from 'Hooks/useLazyLoad'
import LoadingMessagesContainer from 'Utilities/LoadingMessagesContainer'


export default function() {
	const showSidebar = useSelector(state => state.showSidebar)
	const showRightbar = useSelector(state => state.showRightbar)
	const ContactConversation = useLazyLoad(
		import('Components/main/ContactConversation'),
		LoadingMessagesContainer
	)
	
	return (
		<section className='pos--rel flex--1 main'>
			<Switch>
				<Route exact path='/home' children={<UsersList />} />
				<Route path='/home/contacts/:convoId/:userId' children={<ContactConversation />} />
			</Switch>

			{ (showSidebar || showRightbar) && <div className='pos--abs main__modal-overlay'></div> }
		</section>
	)
}