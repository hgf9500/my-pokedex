import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Redux Provider 임포트
import { store } from './RTK/store'; // 우리가 만든 Redux store 임포트
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provider로 App을 감싸고, store를 props로 전달합니다. */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);