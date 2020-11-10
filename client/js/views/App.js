import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get as axiosGet } from 'axios';
import io from 'socket.io-client';
import { set } from 'Actions';
import Header from 'Components/Header';
import Sidebar from 'Components/chunks/sidebar/index';
import Rightbar from 'Components/chunks/rightbar/index';
import Main from 'Components/chunks/main/index';

function App() {
    const [width, setWidth] = useState(null);
    const showSidebar = useSelector(state => state.showSidebar);
    const showRightbar = useSelector(state => state.showRightbar);
    const dispatch = useDispatch();
    const socket = io(`http://localhost:${process.env.SERVER_PORT}/contacts`);

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            const axiosConfig = {
                headers: { Authorization: sessionStorage.getItem('jwt-token') },
            };

            axiosGet('/api/user', axiosConfig).then(({ data }) => {
                localStorage.setItem('user', JSON.stringify(data.user));
                socket.emit('user connects', data.user._id);
            });
        }

        applyViewportWidth();
        window.addEventListener('resize', applyViewportWidth);
    }, []);

    useEffect(() => {
        if (width > 768 && showSidebar) {
            dispatch(set('showSidebar', false));
        }

        if (width > 768 && showRightbar) {
            dispatch(set('showRightbar', false));
        }
    }, [width, showSidebar, showRightbar]);

    function applyViewportWidth() {
        setWidth(window.innerWidth);
    }

    return (
        <main>
            <Header />

            <section className='d--flex'>
                <Sidebar />
                <Main />
                <Rightbar />
            </section>
        </main>
    );
}

export default App;
