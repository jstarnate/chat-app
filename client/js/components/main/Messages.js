import React, { useState, useEffect, useRef, useCallback, forwardRef, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { post as axiosPost } from 'axios'
import Spinner from 'Utilities/Spinner'
import { add } from 'Actions'

const axiosConfig = {
	headers: { Authorization: sessionStorage.getItem('jwt-token') }
}

export default forwardRef((props, ref) => {
	const [loading, setLoading] = useState(false)
	const messages = useSelector(state => state.messages)
	const dispatch = useDispatch()
	const target = useRef(null)

	const ioCallback = useCallback((entries, observer) => {
		if (entries[0].isIntersecting) {
			setLoading(true)

			axiosPost('/api/messages', { date: messages[0].timestamp.iso }, axiosConfig)
				.then(({ data }) => {
					if (data.messages.length) {
						dispatch(add('messages', data.messages))
						ref.current.scrollTo(0, ref.current.scrollHeight / 3)
					}
					else {
						observer.unobserve(target.current)
					}

					setLoading(false)
				})
		}
	}, [messages])

	useEffect(() => {
		const options = {
			root: ref.current,
			rootMargin: '0px',
			threshold: 1.0
		}

		const observer = new IntersectionObserver(ioCallback, options)

		if (target && target.current) {
			observer.observe(target.current)
		}

		return () => {
			observer.disconnect()
		}
	}, [ioCallback])


	if (!messages.length) {
		return <section className='flex--1 pd-l--md pd-r--md main__conversation' />
	}

	return (
		<Fragment>
			<section ref={ref} className='flex--1 pd-l--md pd-r--md main__conversation'>
				{ loading && <Spinner /> }
				<div ref={target}></div>

				{messages.map(({ _id, body, isSelf, timestamp, notSent }) => (
					<div key={_id} className={`pd-t--sm pd-b--sm ${isSelf ? 'text--right' : 'text--left'}`}>
						{ !!timestamp && <span className='d--block font--sm text--gray-20'>{timestamp.standard}</span> }
						<p className={`d--ib ${isSelf ? 'bg--blue text--white text--right' : 'bg--gray-60 text--black text--left'} b-rad--md pd--sm main__message`}>
							{body}
						</p>
						{ !!notSent && <span className='font--sm text--danger'>Not sent</span> }
					</div>
				))}
			</section>
		</Fragment>
	)
})