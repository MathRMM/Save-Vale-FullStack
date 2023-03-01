import React from 'react';
import ReactDOM from 'react-dom/client';

//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/styles/reset.css"
import "./assets/styles/style.css"

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

