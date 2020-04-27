import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Global, css } from '@emotion/core'

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={css`
        body {
          font-family: 'Comic Neue', cursive;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: normal;
          font-family: 'Poppins', sans-serif;
        }
      `}
    />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
