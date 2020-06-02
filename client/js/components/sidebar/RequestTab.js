import React, { useState, useEffect, Fragment } from 'react'
import socket from 'socket.io-client'
import { get as axiosGet } from 'axios'
import { func } from 'prop-types'

const localStorageUser = JSON.parse(localStorage.getItem('user'))
const io = socket(`${process.env.APP_URL}/contacts`)

function RequestTab({ changeEvent }) {
	const [requestsCount, setRequestsCount] = useState(0)
	const [userId, setUserId] = useState(null)

	useEffect(() => {
		getUserId()
		getRequestsCount()
		initializeSockets()
	}, [])

	function getUserId() {
		if (localStorageUser) {
			setUserId(localStorageUser._id)
		}
		else {
			axiosGet('/api/user').then(({ data }) => {
				setUserId(data.user._id)
			})
		}
	}

	function getRequestsCount() {
		axiosGet('/api/user/requests/count')
			.then(({ data }) => {
				setRequestsCount(data.count)	
			})
			.catch(error => {
				setRequestsCount(0)
			})
	}

	function initializeSockets() {
		io.on(`display request count ${userId}`, (number) => {
			setRequestsCount(number)
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