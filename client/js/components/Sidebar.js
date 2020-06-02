import React, { useState, useEffect, lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import Spinner from 'Utilities/Spinner'

const Requests = lazy(() => import('Components/sidebar/Requests'))
const Contacts = lazy(() => (
	Promise.all([
		import('Components/sidebar/Contacts'),
		new Promise(resolve => setTimeout(resolve, 300))
	]).then(([module]) => module)
))
const RequestTab = lazy(() => (
	Promise.all([
		import('./sidebar/RequestTab'),
		new Promise(resolve => setTimeout(resolve, 300))
	]).then(([module]) => module)
))

const currentTab = localStorage.getItem('currentTab')


export default function() {
	const [activeTab, setActiveTab] = useState(null)
	const showSidebar = useSelector(state => state.showSidebar)

	useEffect(() => {
		if (currentTab) {
			setActiveTab(currentTab)
		}
		else {
			localStorage.setItem('currentTab', 'Contacts')
			setActiveTab('Contacts')
		}
	}, [])

	function changeTab(tabName) {
		if (activeTab === tabName) {
			return
		}
		
		localStorage.setItem('currentTab', tabName)
		setActiveTab(tabName)
	}

	return (
		<aside className='sidebar'>
			<div className={`pos--fixed bg--white br--1 b--gray-60 sidebar__wrap ${showSidebar ? 'show' : ''}`}>
				<section className='bb--1 b--gray-60'>
					<label className={`d--ib text--center br--1 b--gray-60 pd-t--md pd-b--md sidebar__tab ${activeTab === 'Contacts' ? 'active' : ''}`}>
						<input className='d--none' type='radio' name='tab' value='Contacts' onChange={changeTab.bind(null, 'Contacts')} />
						<span className='text--gray-20 text--bold'>Contacts</span>
					</label>

					<label className={`d--ib text--center pd-t--md pd-b--md sidebar__tab ${activeTab === 'Requests' ? 'active' : ''}`}>
						<Suspense fallback={<span className='text--gray-20 text--bold'>Requests</span>}>
							<RequestTab changeEvent={changeTab.bind(null, 'Requests')} />
						</Suspense>
					</label>
				</section>

				{
					activeTab === 'Contacts' ? (
						<Suspense fallback={<Spinner className='mg-t--sm' />}>
							<Contacts />
						</Suspense>
					) : (
						<Suspense fallback={<Spinner className='mg-t--sm' />}>
							<Requests />
						</Suspense>
					)
				}
			</div>
		</aside>
	)
}