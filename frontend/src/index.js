import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';
import App from './components/App';
import {errorProvider} from './contexts/errorContext';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
