import React, { useState, useEffect, Fragment } from 'react'
import io from 'socket.io-client'
import { get as axiosGet } from 'axios'
import { func } from 'prop-types'

const socket = io(`${process.env.APP_URL}/contacts`)
const axiosConfig = {
    headers: { Authorization: sessionStorage.getItem('jwt-token') }
}

function RequestTab({ changeEvent }) {
	const [requestsCount, setRequestsCount] = useState(0)
	const [userId, setUserId] = useState(null)

	useEffect(() => {
		getUserId()
		getRequestsCount()
	}, [])

	useEffect(() => {
		socket.on(`display request count ${userId}`, (number) => {
			setRequestsCount(number)
		})
	}, [userId])

	function getUserId() {
		if (localStorage.getItem('user')) {
			setUserId(JSON.parse(localStorage.getItem('user'))._id)
		}
		else {
			const config = {
				headers: { Authorization: sessionStorage.getItem('jwt-token') }
			}

			axiosGet('/api/user', axiosConfig)
				.then(({ data }) => {
					setUserId(data.user._id)
				})
		}
	}

	function getRequestsCount() {
		axiosGet('/api/user/requests/count', axiosConfig)
			.then(({ data }) => {
				setRequestsCount(data.count)	
			})
			.catch(error => {
				setRequestsCount(0)
			})
	}

	return (
		<Fragment>
			<input className='d--none' type='radio' name='tab' value='Requests' onChange={changeEvent} />
			<span className='text--gray-20 text--bold'>Requests</span>
			{!!requestsCount &&
				<b className='text--danger mg-l--xs'>
					{requestsCount > 9 ? '9+' : requestsCount}
				</b>
			}
		</Fragment>
	)
}

RequestTab.propTypes = {
	changeEvent: func.isRequired
}

export default RequestTab