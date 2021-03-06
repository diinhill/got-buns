import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/bootstrap.min.css';
import './assets/scss/now-ui-kit.scss?v=1.5.0';
import './assets/gotbuns/gotbuns.css';
import "./assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
