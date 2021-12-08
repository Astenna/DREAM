import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from '../../dashboard/dashboard/Dashboard';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<div>It works.</div>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/login" element={<></>}/>
                <Route path="/about" element={<></>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;