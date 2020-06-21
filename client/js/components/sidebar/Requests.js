import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { get as axiosGet } from 'axios'
import { set } from 'Actions'
import Requester from './Requester'
import Spinner from 'Utilities/Spinner'

export default function() {
    const [loading, setLoading] = useState(false)
    const requests = useSelector(state => state.requests)
    const dispatch = useDispatch()
    let isMounted = false

    useEffect(() => {
        isMounted = true
        const config = {
            headers: { Authorization: sessionStorage.getItem('jwt-token') }
        }
        
        setLoading(true)

        axiosGet('/api/user/requests', config)
            .then(({ data }) => {
                if (isMounted) {
                    dispatch(set('requests', data.requests))
                    setLoading(false)
                }
            })
            .catch(() => {
                setLoading(false)
            })

        return () => {
            isMounted = false
        }
    }, [])


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
            {requests.map(request => <Requester key={request._id} {...request} />)}
        </section>
    )
}