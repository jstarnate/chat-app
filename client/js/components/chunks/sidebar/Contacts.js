import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { post as axiosPost } from 'axios';
import { NavLink } from 'react-router-dom';
import { bool, func, arrayOf, object } from 'prop-types';
import ProfilePhoto from 'Utilities/ProfilePhoto';
import Spinner from 'Utilities/Spinner';
import { push } from 'Actions';

const axiosConfig = {
    headers: { Authorization: sessionStorage.getItem('jwt-token') },
};

function Contacts({ contacts, loading, setLoading }) {
    const [date, setDate] = useState(new Date());
    const container = useRef(null);
    const target = useRef(null);
    const dispatch = useDispatch();
    const ioCallback = useCallback(
        (entries, observer) => {
            if (entries[0].isIntersecting) {
                setLoading(true);

                axiosPost('/api/user/contacts', { date }, axiosConfig).then(
                    ({ data }) => {
                        if (data.contacts.length) {
                            dispatch(push('contacts', data.contacts));
                        } else {
                            observer.unobserve(target.current);
                        }

                        setDate(data.date);
                        setLoading(false);
                    }
                );
            }
        },
        [date]
    );

    useEffect(() => {
        const options = {
            root: container.current,
            rootMargin: '0px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(ioCallback, options);

        if (target && target.current) {
            observer.observe(target.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [ioCallback]);

    return (
        <section ref={container} className='sidebar__contacts'>
            {contacts.map(({ _id, user }) => (
                <NavLink
                    key={_id}
                    to={`/home/contacts/${_id}/${user._id}`}
                    className='d--flex ai--center pd--md sidebar__list-item'
                    activeClassName='active'>
                    <ProfilePhoto
                        imageClassName='d--block round sidebar__avatar'
                        imagePath={user.image_path}
                        gender={user.gender}
                        avatarSize={35}
                    />

                    <span className='text--bold mg-l--sm sidebar__item-info'>
                        {user.first_name} {user.last_name}
                    </span>
                    <span
                        className={`bg--${
                            user.online ? 'primary' : 'gray-light'
                        } round mg-l--auto sidebar__right-side`}></span>
                </NavLink>
            ))}

            <div ref={target}></div>

            {loading && <Spinner className='mg-t--sm' />}
        </section>
    );
}

Contacts.propTypes = {
    contacts: arrayOf(object),
    loading: bool.isRequired,
    setLoading: func.isRequired,
};

export default Contacts;
