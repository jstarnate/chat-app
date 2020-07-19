import React, { useState, useEffect } from 'react'

export default function(promise, Loading) {
	const [data, setData] = useState({ component: null })
	const { component: Component } = data

	useEffect(() => {
		promise.then(mod => {
			setData({ component: mod.default })
		})
	}, [])

	if (!data.component) {
		return Loading
	}

	return Component
}