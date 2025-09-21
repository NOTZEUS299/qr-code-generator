import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import QrContextProvider from "./store/qr-context";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QrContextProvider>
      <App />
    </QrContextProvider>
  </StrictMode>,
)
