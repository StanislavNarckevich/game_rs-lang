import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// ANCHOR todo
// var alienMsg = new Promise((res, rej) => {
//   fetch('jsonplaceholder.com')
//     .then((response) => response.text())
//     .then((body) => {
//       //console.log(body);
//       return body;
//     })
//     .then((txt) => {
//       //returning inside then using JavaScript promises resolve
//       res(txt);
//     });
// });

// (() => {
//   alienMsg.then((data) => console.log(data));
// })();

// console.log(alienMsg);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
