import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
    const root = document.querySelector('#portal');
    const el = document.createElement('section');

    useEffect(() => {
        root?.appendChild(el);

        return () => {
            root?.removeChild(el);
        };
    }, [el, root]);

    return createPortal(children, el);
};

export default Portal;
