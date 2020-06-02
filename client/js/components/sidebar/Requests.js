import React, { useState, useEffect, useCallback } from 'react'
import { get as axiosGet } from 'axios'
import Requester from './Requester'
import Spinner from 'Utilities/Spinner'

export default function() {
    const [loading, setLoading] = useState(false)
    const [requests, setRequests] = useState([])
    let isMounted = false

    useEffect(() => {
        isMounted = true
        
        getRequests()

        return () => {
            isMounted = false
        }
    }, [])

    const removeRequest = useCallback(id => {
        const filtered = requests.filter(request => request._id !== id)
        setRequests(filtered)
    }, [])

    function getRequests() {
        setLoading(true)

        axiosGet('/api/user/requests')
            .then(({ data }) => {
                if (isMounted) {
                    setRequests(data.requests)
                    setLoading(false)
                }
            })
            .catch(() => {
                setLoading(false)
            })
    }

    if (loading) {
        return <Spinner className='mg-t--md' />
    }

    if (!loading && !requests.length) {
        return (
            <p className='font--lg text--gray-20 text--bold text--center pd--md'>
                You don't have any chat request.
            </p>
        )
    }

    return (
        <section>
            {requests.map(request => <Requester key={request._id} removeEvent={removeRequest} {...request} />)}
        </section>
    )
}