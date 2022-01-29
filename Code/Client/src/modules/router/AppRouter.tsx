import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import {useAppSelector} from '../../store/hooks';
import {selectAuthenticated} from '../../store/auth/authSlice';
import Homepage from '../homepage/Homepage';
import NotAuthorized403 from '../common/not-authorized-403/NotAuthorized403';
import NotFound404 from '../common/not-found-404/NotFound404';
import ServerError500 from '../common/server-error-500/ServerError500';
import links from '../../values/links';

/**
 * Application router.
 * Renders given component based on address of the page.
 * @constructor
 */
const AppRouter = () => {
  const authenticated = useAppSelector(selectAuthenticated)

  return (
    <Router>
      <Routes>
        <Route path={links.ROOT} element={<>{authenticated ? <Dashboard/> : <Homepage/>}</>}/>
        <Route path={links.NO_AUTHORIZED_403} element={<NotAuthorized403/>}/>
        <Route path={links.NOT_FOUND_404} element={<NotFound404/>}/>
        <Route path={links.SERVER_ERROR_500} element={<ServerError500/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;