import { useState } from 'react'

export default function(initialValue) {
	const [value, modifyEvent] = useState(initialValue)
	const [error, setError] = useState(null)

	function handle(fn, event) {
		fn(event.target.value)
	}

	function handleError(obj) {
		setError(obj ? obj.message : null)
	}

	const data = { value, error, onChangeEvent: handle.bind(null, modifyEvent) }

	return [value, data, handleError]
}