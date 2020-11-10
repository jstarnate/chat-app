import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { get as axiosGet, post as axiosPost, put as axiosPut } from 'axios';
import io from 'socket.io-client';
import Messages from './Messages';
import MessageBox from './MessageBox';
import ProfilePhoto from 'Utilities/ProfilePhoto';
import LoadingMessagesContainer from 'Utilities/LoadingMessagesContainer';
import { set, push } from 'Actions';

const axiosConfig = {
    headers: { Authorization: sessionStorage.getItem('jwt-token') },
};

export default function () {
    const [user, setUser] = useState({});
    const [seen, setSeen] = useState(false);
    const [scrollable, setScrollable] = useState(true);
    const [loading, setLoading] = useState(false);
    const messages = useSelector(state => state.messages);
    const dispatch = useDispatch();
    const { convoId, userId } = useParams();
    const messagesContainer = useRef(null);
    const socket = io(`http://localhost:${process.env.SERVER_PORT}/messages`);
    const { _id } = JSON.parse(localStorage.getItem('user'));

    function getContactInfoAndMessages() {
        setLoading(true);

        Promise.all([
            axiosGet(`/api/user/contact-info?id=${userId}`, axiosConfig),
            axiosPost(
                '/api/messages',
                { id: convoId, date: new Date() },
                axiosConfig
            ),
            axiosGet(
                `/api/conversations/seen?convoId=${convoId}&userId=${userId}`,
                axiosConfig
            ),
        ]).then(([infoResponse, messagesResponse, convoResponse]) => {
            setUser(infoResponse.data.user);
            dispatch(set('messages', messagesResponse.data.messages));
            setSeen(!!convoResponse.data.seen);
            setLoading(false);
            scrollToBottom();
        });
    }

    function scrollToBottom() {
        const container = messagesContainer.current;

        if (container && container.scrollHeight > container.clientHeight) {
            container.scrollTo(0, container.scrollHeight);
        } else {
            setScrollable(false);
        }
    }

    function removeSeen() {
        axiosPut(
            '/api/conversations/nullify-seener',
            { id: convoId },
            axiosConfig
        );
        setSeen(false);
    }

    useEffect(() => {
        socket.on('receive message', data => {
            const { receiverId, ...body } = data;

            if (receiverId === _id) {
                dispatch(push('messages', body));
            }
        });
    }, []);

    useEffect(() => {
        getContactInfoAndMessages();
        dispatch(set('showSidebar', false));
    }, [convoId]);

    useEffect(() => {
        if (messages.length && !messages[messages.length - 1].isSelf) {
            setSeen(false);
            socket.emit('send user id', convoId, _id);
        }
    }, [convoId, messages]);

    useEffect(() => {
        socket.on('seen', (cid, uid) => {
            if (convoId === cid && uid !== _id) {
                setSeen(true);
            }
        });
    }, [convoId]);

    if (loading) {
        return <LoadingMessagesContainer />;
    }

    return (
        <Fragment>
            <header className='pos--sticky d--flex ai--center bg--pale bb--1 b--gray-lighter pd--sm main__header'>
                <ProfilePhoto
                    imageClassName='round'
                    imagePath={user.image_path}
                    gender={user.gender}
                    avatarSize={33}
                />

                <h4 className='mg-l--sm'>
                    {user.first_name} {user.last_name}
                </h4>
            </header>

            <Messages
                ref={messagesContainer}
                id={convoId}
                seen={seen}
                scrollable={scrollable}
            />

            <MessageBox
                convoId={convoId}
                userId={userId}
                removeSeen={removeSeen}
            />
        </Fragment>
    );
}
