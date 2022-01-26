import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import Homepage from '../homepage/Homepage';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/login" element={<></>}/>
                <Route path="/about" element={<></>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;