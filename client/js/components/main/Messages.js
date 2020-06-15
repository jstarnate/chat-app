import React, { forwardRef } from 'react'
import { arrayOf, object } from 'prop-types'

const Messages = forwardRef((props, ref) => (
	<section ref={ref} className='flex--1 pd-l--md pd-r--md main__conversation'>
		{props.messages.map(({ _id, body, isSelf, timestamp }) => (
			<div key={_id} className={`pd-t--sm pd-b--sm ${isSelf ? 'text--right' : 'text--left'}`}>
				<span className='d--block font--sm text--gray-20'>{timestamp}</span>
				<p className={`d--ib ${isSelf ? 'bg--blue text--white text--right' : 'bg--gray-60 text--black text--left'} b-rad--md pd--sm main__message`}>
					{body}
				</p>
			</div>
		))}
	</section>
))

Messages.propTypes = {
	messages: arrayOf(object)
}

export default Messages