import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import UsersList from './UsersList';
import LoadingMessagesContainer from 'Utilities/LoadingMessagesContainer';

const ContactConversation = lazy(() => import('./ContactConversation'));

function Main() {
    const showSidebar = useSelector(state => state.showSidebar);
    const showRightbar = useSelector(state => state.showRightbar);

    return (
        <section className='pos--rel flex--1 main'>
            <Switch>
                <Route exact path='/home'>
                    <UsersList />
                </Route>

                <Route path='/home/contacts/:convoId/:userId'>
                    <Suspense fallback={LoadingMessagesContainer}>
                        <ContactConversation />
                    </Suspense>
                </Route>
            </Switch>

            {(showSidebar || showRightbar) && (
                <div className='pos--abs main__modal-overlay'></div>
            )}
        </section>
    );
}

export default Main;
