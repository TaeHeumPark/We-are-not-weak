import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import './fonts/font.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { RecoilRoot } from 'recoil'
import { InputJs1, InputJs2, InputJs3 } from './components/InputJs'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </Provider>,
)
