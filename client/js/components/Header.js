import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set } from 'Actions';

function Header() {
    const showSidebar = useSelector(state => state.showSidebar);
    const showRightbar = useSelector(state => state.showRightbar);
    const dispatch = useDispatch();

    const sidebarToggle = useCallback(() => {
        dispatch(set('showSidebar', !showSidebar));

        if (!showSidebar) {
            dispatch(set('showRightbar', false));
        }
    }, [showSidebar]);

    function showInfo() {
        dispatch(set('showRightbar', true));
        dispatch(set('showSidebar', false));
    }

    function hideInfo() {
        dispatch(set('showRightbar', false));
    }

    return (
        <header className='pos--sticky bb--1 b--gray-lighter header'>
            <div className='d--flex ai--center pd-t--md pd-b--md pd-l--lg pd-r--lg header__wrap'>
                <button className='btn header__bars' onClick={sidebarToggle}>
                    <i className='fa fa-th-list font--md text--white'></i>
                </button>

                <a className='pos--abs header__logo' href='/home'>
                    <svg
                        className='d--block'
                        width='38'
                        height='85'
                        viewBox='0 0 300 253'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M10 5H290C292.761 5 295 7.23858 295 10V190C295 192.761 292.761 195 290 195H265.574C259.4 195 253.857 198.783 251.606 204.532L242.712 227.249C241.05 231.494 235.038 231.482 233.393 227.23L224.636 204.589C222.401 198.81 216.842 195 210.646 195H10C7.23858 195 5 192.761 5 190V10C5 7.23858 7.23858 5 10 5Z'
                            fill='white'
                            stroke='#5087C7'
                            strokeWidth='10'
                        />
                        <path
                            d='M126 123.5C145.479 136.915 155.989 136.924 174 123.5'
                            stroke='#5087C7'
                            strokeWidth='10'
                        />
                        <circle
                            cx='98'
                            cy='85'
                            r='15'
                            fill='white'
                            stroke='#5087C7'
                            strokeWidth='10'
                        />
                        <path
                            d='M182 90.6916C198.639 79.1277 207.402 79.078 222 90.6916'
                            stroke='#5087C7'
                            strokeWidth='10'
                        />
                    </svg>
                </a>

                {showRightbar ? (
                    <button
                        className='btn font--lg mg-l--auto header__arrow'
                        title='Show profile info'
                        onClick={hideInfo}>
                        <i className='fa fa-chevron-right text--white'></i>
                    </button>
                ) : (
                    <button
                        className='btn font--lg mg-l--auto header__arrow'
                        title='Hide profile info'
                        onClick={showInfo}>
                        <i className='fa fa-chevron-left text--white'></i>
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
