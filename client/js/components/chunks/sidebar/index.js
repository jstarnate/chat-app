import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { get as axiosGet } from 'axios';
import Contacts from './Contacts';
import { add, update } from 'Actions';

function Sidebar() {
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const contacts = useSelector(state => state.contacts);
    const showSidebar = useSelector(state => state.showSidebar);
    const dispatch = useDispatch();
    const socket = io(`http://localhost:${process.env.SERVER_PORT}/contacts`);

    function toggleStatus(id, status) {
        const contact = contacts.find(contact => contact.user._id === id);

        if (contact) {
            const { online, ...user } = contact.user;

            dispatch(
                update('contacts', contact._id, {
                    _id: contact._id,
                    user: { ...user, online: status },
                    createdAt: contact.createdAt,
                })
            );
        }
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const id = JSON.parse(localStorage.getItem('user'))._id;

            setUserId(id);
            socket.emit('user connects', id);
        } else {
            const axiosConfig = {
                headers: { Authorization: sessionStorage.getItem('jwt-token') },
            };

            axiosGet('/api/user', axiosConfig).then(({ data }) => {
                setUserId(data.user._id);
                socket.emit('user connects', data.user._id);
            });
        }
    }, []);

    useEffect(() => {
        socket.on('add to contacts', data => {
            if (data.id === userId) {
                dispatch(add('contacts', data.contact));
            }
        });
    }, [userId]);

    useEffect(() => {
        socket.on('online user', id => {
            toggleStatus(id, true);
        });

        socket.on('offline user', id => {
            toggleStatus(id, false);
        });
    }, [contacts]);

    return (
        <aside className='sidebar'>
            <div
                className={`pos--fixed bg--white br--1 b--gray-lighter sidebar__wrap ${
                    showSidebar ? 'show' : ''
                }`}>
                <h3 className='d--flex ai--center pd--md'>
                    <span className='text--gray'>Conversations</span>
                    <span
                        className='bg--gray round mg-l--xs'
                        style={{ width: '5px', height: '5px' }}></span>
                    <span className='text--gray mg-l--xs'>
                        {contacts.length}
                    </span>
                </h3>

                <Contacts
                    contacts={contacts}
                    loading={loading}
                    setLoading={setLoading}
                />

                {!loading && !contacts.length && (
                    <p className='font--lg text--gray text--bold text--center pd--md'>
                        You do not have any contact.
                    </p>
                )}
            </div>
        </aside>
    );
}

export default Sidebar;
