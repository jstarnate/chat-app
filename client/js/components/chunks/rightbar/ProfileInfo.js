import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { post as axiosPost } from 'axios';
import MaleDefaultAvatar from 'Utilities/MaleDefaultAvatar';
import FemaleDefaultAvatar from 'Utilities/FemaleDefaultAvatar';
import Spinner from 'Utilities/Spinner';
import Portal from 'Utilities/Portal';
import Modal from 'Utilities/Modal';
import useFetch from 'Hooks/useFetch';
import { set } from 'Actions';

const localUser = localStorage.getItem('user');

function ProfileInfo() {
    const [user, setUser] = useState({});
    const [showSignoutModal, setShowSignoutModal] = useState(false);
    const [getUser, loading] = useFetch('/api/user', resolveFn);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localUser) {
            setUser(JSON.parse(localUser));
        } else {
            getUser();
        }
    }, []);

    function resolveFn({ data }) {
        setUser(data.user);
    }

    function enableEditMode() {
        dispatch(set('editMode', true));
    }

    function confirmSignout() {
        setShowSignoutModal(true);
    }

    function closeSignoutModal() {
        setShowSignoutModal(false);
    }

    function signOut() {
        const config = {
            headers: { Authorization: sessionStorage.getItem('jwt-token') },
        };

        axiosPost('/logout', null, config).then(() => {
            localStorage.clear();
            sessionStorage.clear();

            location = '/index';
        });
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <div className='text--center'>
                <div className='d--ib round rightbar__avatar-container'>
                    {!user.image_path && user.gender === 'Male' ? (
                        <MaleDefaultAvatar />
                    ) : !user.image_path && user.gender === 'Female' ? (
                        <FemaleDefaultAvatar />
                    ) : (
                        <img
                            className='d--block round rightbar__avatar'
                            src={user.image_path}
                            alt='Avatar'
                        />
                    )}
                </div>
            </div>

            <div className='mg-t--md'>
                <label className='text--gray'>Name</label>
                <p className='text--bold mg-t--xs mg-b--auto'>
                    {user.first_name} {user.last_name}
                </p>
            </div>

            <div className='mg-t--md'>
                <label className='text--gray'>Username</label>
                <p className='text--bold mg-t--xs mg-b--auto'>
                    @{user.username}
                </p>
            </div>

            <button
                className='btn btn--primary full-width text--bold b-rad--sm pd-t--xs pd-b--xs mg-t--lg'
                onClick={enableEditMode}>
                Edit info
            </button>

            <button
                className='btn btn--secondary full-width b-rad--sm pd-t--xs pd-b--xs mg-t--md'
                onClick={confirmSignout}>
                Sign out
            </button>

            {showSignoutModal && (
                <Portal>
                    <Modal prompt='Are you sure you want to sign out?'>
                        <>
                            <button
                                className='btn btn--secondary curved pd-t--xs pd-b--xs pd-l--md pd-r--md'
                                onClick={closeSignoutModal}>
                                Cancel
                            </button>

                            <button
                                className='btn btn--primary text--bold curved pd-t--xs pd-b--xs pd-l--md pd-r--md mg-l--sm'
                                onClick={signOut}>
                                Sign out
                            </button>
                        </>
                    </Modal>
                </Portal>
            )}
        </>
    );
}

export default ProfileInfo;
