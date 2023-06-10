import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={Store}>
   <App/>
   </Provider>
  </React.StrictMode>
);
//babel javascript
// var React = require("react");
// var ReactDOM =require("react-dom");
// ReactDOM.render(<h1>hello world</h1>,document.getElementById("root"))
// let h1 = document.createElement("h1");
// h1.innerHTML="hello world";
// document.getElementById("root").appendChild(h1);

