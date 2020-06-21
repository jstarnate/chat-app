import React from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import { string, element } from 'prop-types'
import { set } from 'Actions'

function Modal({ name, prompt, children }) {
	const showModal = useSelector(state => state[name])

	const modal = (
		<section className='d--flex ai--center jc--center overlay'>
			<div className='bg--white b-rad--md overlay__modal'>
				<p className='font--lg pd--md'>{prompt}</p>
				<div className='d--flex jc--end bt--1 b--gray-40 pd--sm'>
					{children}
				</div>
			</div>
		</section>
	)

	if (!showModal) {
		return null
	}

	return createPortal(modal, document.querySelector('#app'))
}

Modal.propTypes = {
	name: string.isRequired,
	prompt: string.isRequired,
	children: element
}

export default Modal