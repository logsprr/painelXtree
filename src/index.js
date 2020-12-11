import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/routes';
import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyC2MmIx1psmpUT5q68sp-DJTGZ-HMzhZDM",
    authDomain: "chalengextree.firebaseapp.com",
    projectId: "chalengextree",
    storageBucket: "chalengextree.appspot.com",
    messagingSenderId: "302974599152",
    appId: "1:302974599152:web:d382c81ce4f49154916735"
};

firebase.initializeApp(config);
ReactDOM.render(
    <React.StrictMode>
        <Routes />
    </React.StrictMode>,
    document.getElementById('root')
);