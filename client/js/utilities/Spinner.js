import React from 'react'
import { string } from 'prop-types'

function Spinner({ size, stroke, className }) {
	return (
		<div className={className}>
			<svg xmlns="http://www.w3.org/2000/svg" className='d--block mg-l--auto mg-r--auto' style={{ shapeRendering: 'auto' }} width={size} height={size} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
				<circle cx="50" cy="50" r="32" strokeWidth="8" stroke={stroke} strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round" transform="rotate(181.082 50 50)">
					<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="500ms" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
				</circle>
			</svg>
		</div>
	)
}

Spinner.propTypes = {
	size: string,
	stroke: string,
	className: string
}

Spinner.defaultProps = {
	size: '30px',
	stroke: '#5087C7'
}

export default Spinner