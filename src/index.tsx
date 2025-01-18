import React from 'react';
import ReactDOM from 'react-dom/client';
import { reportWebVitals } from './reportWebVitals';
import { App } from 'components';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<React.StrictMode><App /></React.StrictMode>);

reportWebVitals();