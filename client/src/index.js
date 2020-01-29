import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LoadingIndicator from './components/view/LoadingIndicator';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18next';
import 'font-awesome/css/font-awesome.min.css';


ReactDOM.render(
    <Suspense fallback=
    {(
    <div style={{background: 'violet'}}>Loading <span role='img' aria-label="test-tube">🧪</span></div>
    )} 
    >
        <App />
        <LoadingIndicator />
    </Suspense>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
