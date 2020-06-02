import React, { Suspense, lazy } from 'react'
import { render } from 'react-dom'
import Spinner from 'Utilities/Spinner'

const Index = lazy(() => import('Views/Index'))

render(
	<Suspense fallback={<Spinner className='mg-t--lg' />}>
		<Index />
	</Suspense>,
	document.querySelector('#index')
)
