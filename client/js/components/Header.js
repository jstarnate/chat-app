import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { func } from 'prop-types'
import { set } from 'Actions'

function Header({ confirmSignout }) {
	const showSidebar = useSelector(state => state.showSidebar)
	const dispatch = useDispatch()

	function sidebarToggle() {
		dispatch(set('showSidebar', !showSidebar))
	}

	return (
		<header className='pos--sticky bg--blue header'>
			<div className='d--flex ai--center pd-t--md pd-b--md pd-l--lg pd-r--lg header__wrap'>
				<button className='btn header__bars' onClick={sidebarToggle}>
					<i className='fa fa-bars font--md text--white'></i>
				</button>

				<a className='pos--abs header__logo' href='/home'>
					<svg className='d--block' width="38" height="85" viewBox="0 0 300 253" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10 5H290C292.761 5 295 7.23858 295 10V190C295 192.761 292.761 195 290 195H265.574C259.4 195 253.857 198.783 251.606 204.532L242.712 227.249C241.05 231.494 235.038 231.482 233.393 227.23L224.636 204.589C222.401 198.81 216.842 195 210.646 195H10C7.23858 195 5 192.761 5 190V10C5 7.23858 7.23858 5 10 5Z" fill="#5087C7" stroke="white" strokeWidth="10"/>
						<path d="M126 123.5C145.479 136.915 155.989 136.924 174 123.5" stroke="white" strokeWidth="10"/>
						<circle cx="98" cy="85" r="15" fill="#5087C7" stroke="white" strokeWidth="10"/>
						<path d="M182 90.6916C198.639 79.1277 207.402 79.078 222 90.6916" stroke="white" strokeWidth="10"/>
					</svg>
				</a>
				
				<button className='btn font--lg mg-l--auto' title='Sign out' onClick={confirmSignout}>
					<i className='fa fa-sign-out text--white'></i>
				</button>
			</div>
		</header>
	)
}

Header.propTypes = {
	confirmSignout: func.isRequired
}

export default Header
