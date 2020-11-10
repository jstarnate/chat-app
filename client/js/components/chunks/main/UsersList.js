import React, { useState, useEffect } from 'react';
import Spinner from 'Utilities/Spinner';
import User from './User';
import useFetch from 'Hooks/useFetch';

function UsersList() {
    const [users, setUsers] = useState([]);
    const [getUsers, loading] = useFetch('/api/user/all', resolveFn);

    useEffect(() => {
        getUsers();
    }, []);

    function resolveFn({ data }) {
        setUsers(data.users);
    }

    function removeUser(id) {
        const filtered = users.filter(user => user._id !== id);
        setUsers(filtered);
    }

    if (loading) {
        return <Spinner className='mg-t--md' />;
    }

    if (!loading && !users.length) {
        return <h2 className='text--center mg-t--md'>No users</h2>;
    }

    return (
        <section className='pd--md main__users'>
            {users.map(user => (
                <User key={user._id} removeEvent={removeUser} {...user} />
            ))}
        </section>
    );
}

export default UsersList;
