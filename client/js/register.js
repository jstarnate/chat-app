import React, { Suspense, lazy } from 'react'
import { render } from 'react-dom'
import Spinner from 'Utilities/Spinner'

const Register = lazy(() => import('Views/Register'))

render(
	<Suspense fallback={<Spinner className='mg-t--lg' />}>
		<Register />
	</Suspense>,
	document.querySelector('#register')
)
