import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import {useAppSelector} from '../../store/hooks';
import {selectAuthenticated} from '../../store/auth/authSlice';
import Homepage from '../homepage/Homepage';

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
        <Route path="/" element={<>{authenticated ? <Dashboard/> : <Homepage/>}</>}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;