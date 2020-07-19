import React from 'react'
import { useSelector } from 'react-redux'
import ProfileInfo from './rightbar/ProfileInfo'
import useLazyLoad from 'Hooks/useLazyLoad'
import Spinner from 'Utilities/Spinner'


export default function() {
	const editMode = useSelector(state => state.editMode)
	const showRightbar = useSelector(state => state.showRightbar)
	const ContactConversation = useLazyLoad(import('./rightbar/UpdateInfoForm'), Spinner)

	return (
		<aside className='rightbar'>
			<div className={`pos--fixed bg--white bl--1 b--gray-60 pd--md rightbar__wrap ${showRightbar ? 'show' : ''}`}>
				{ !editMode ? <ProfileInfo /> : <UpdateInfoForm /> }
			</div>
		</aside>
	)
}