import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    forwardRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { post as axiosPost } from 'axios';
import { string, bool } from 'prop-types';
import Spinner from 'Utilities/Spinner';
import { add } from 'Actions';

const axiosConfig = {
    headers: { Authorization: sessionStorage.getItem('jwt-token') },
};

const Messages = forwardRef((props, ref) => {
    const [loading, setLoading] = useState(false);
    const messages = useSelector(state => state.messages);
    const dispatch = useDispatch();
    const target = useRef(null);

    const ioCallback = useCallback(
        (entries, observer) => {
            if (entries[0].isIntersecting) {
                setLoading(true);

                axiosPost(
                    '/api/messages',
                    { id: props.id, date: messages[0].timestamp.iso },
                    axiosConfig
                ).then(({ data }) => {
                    if (data.messages.length) {
                        dispatch(add('messages', data.messages));
                        ref.current.scrollTo(0, ref.current.scrollHeight / 3);
                    } else {
                        observer.unobserve(target.current);
                    }

                    setLoading(false);
                });
            }
        },
        [messages]
    );

    useEffect(() => {
        const options = {
            root: ref.current,
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

    if (!messages.length) {
        return (
            <section className='flex--1 pd-l--md pd-r--md main__conversation' />
        );
    }

    return (
        <section ref={ref} className='pos--rel flex--1 main__conversation'>
            {loading && <Spinner />}
            {props.scrollable && <div ref={target}></div>}

            <div className='pos--sticky d--flex jc--end flex--column pd-l--md pd-r--md main__conversation-wrap'>
                {messages.map(({ _id, body, isSelf, timestamp, notSent }) => (
                    <div
                        key={_id}
                        className={`pd-t--sm pd-b--sm ${
                            isSelf ? 'text--right' : 'text--left'
                        }`}>
                        {/* Message timestamp */}
                        {!!timestamp && (
                            <span className='d--block font--sm text--gray'>
                                {timestamp.standard}
                            </span>
                        )}
                        {/* Message body */}
                        <p
                            className={`d--ib ${
                                isSelf
                                    ? 'bg--primary text--white text--right'
                                    : 'bg--gray-lighter text--black text--left'
                            } b-rad--md pd--sm main__message`}>
                            {body}
                        </p>
                        {/* Message sent status */}
                        {!!notSent && (
                            <span className='font--sm text--danger'>
                                Not sent
                            </span>
                        )}
                    </div>
                ))}

                {props.seen && (
                    <i className='fa fa-check-circle pos--abs text--success main__seen'></i>
                )}
            </div>
        </section>
    );
});

Messages.propTypes = {
    id: string.isRequired,
    seen: bool.isRequired,
    scrollable: bool.isRequired,
};

Messages.displayName = 'Messages';

export default Messages;
