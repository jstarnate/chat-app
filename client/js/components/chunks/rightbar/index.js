import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import ProfileInfo from './ProfileInfo';
import Spinner from 'Utilities/Spinner';

const UpdateInfoForm = lazy(() => import('./UpdateInfoForm'));

function Rightbar() {
    const editMode = useSelector(state => state.editMode);
    const showRightbar = useSelector(state => state.showRightbar);

    return (
        <aside className='rightbar'>
            <div
                className={`pos--fixed bg--white bl--1 b--gray-lighter pd--md rightbar__wrap ${
                    showRightbar ? 'show' : ''
                }`}>
                {!editMode ? (
                    <ProfileInfo />
                ) : (
                    <Suspense fallback={<Spinner />}>
                        <UpdateInfoForm />
                    </Suspense>
                )}
            </div>
        </aside>
    );
}

export default Rightbar;
