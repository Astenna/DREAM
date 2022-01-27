import React from 'react';
import './App.less';
import AppRouter from '../router/AppRouter';

/**
 * Main component of the application.
 */
const App = () => (
    <div className="App">
        <AppRouter/>
    </div>
);

export default App;