import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./styles/main.scss"
import { combinedReducer } from "./reducers/combinedReducer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const store = configureStore({reducer:combinedReducer})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
