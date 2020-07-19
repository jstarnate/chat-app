import React, { Fragment } from 'react'
import Spinner from './Spinner'

export default function() {
	return (
		<Fragment>
			<header className='pos--sticky bg--pale bb--1 b--gray-60 pd--md main__header'>
				<div className='bg--gray-60 main__name-placeholder'></div>
			</header>

			<Spinner className='mg-t--md' />
		</Fragment>
	)
}