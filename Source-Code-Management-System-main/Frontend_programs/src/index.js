import React from 'react';
import { BrowserRouter,Routes, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
//import FileUploader from './FileUploader';
//import './FileUploader.css';
//import FirstFile from './FirstFile';
// import Login from "./Login";
//import Formdummy from './Formdummy';
import UserHomeProject from './UserHomeProject';
import OrgLogin from './OrgLogin';
import UserRegister from './UserRegister';
import UserLogin from './UserLogin';
import FileUploader from './FileUploader';
import MyDropzone from './Dropping';
import DragAndDrop from './DragandDrop';
import HomePage from './HomePage';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   // <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
 // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
