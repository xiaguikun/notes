import React from 'react'; //引入之后可以使用react的api和写jsx语法
import ReactDOM from 'react-dom'; //用于渲染组件到视图
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; //用来测量性能报告的函数

// ReactDOM.render render函数是用来渲染的
// React.StrictMode 表示我们使用了严格模式

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
