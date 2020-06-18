import React, { useState, lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import ProfileInfo from './rightbar/ProfileInfo'
import Spinner from 'Utilities/Spinner'

const UpdateInfoForm = lazy(() => import('./rightbar/UpdateInfoForm'))

export default function() {
	const [editMode, setEditMode] = useState(false)
	const showRightbar = useSelector(state => state.showRightbar)

	return (
		<aside className='rightbar'>
			<div className={`pos--fixed bg--white bl--1 b--gray-60 pd--md rightbar__wrap ${showRightbar ? 'show' : ''}`}>
				{
					!editMode ?
					<ProfileInfo clickEvent={setEditMode.bind(null, true)} /> :
					(
						<Suspense fallback={<Spinner />}>
							<UpdateInfoForm clickEvent={setEditMode.bind(null, false)} />
						</Suspense>
					)
				}
			</div>
		</aside>
	)
}