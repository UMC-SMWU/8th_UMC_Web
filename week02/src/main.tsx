import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CounterProvide } from './context/CounterProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CounterProvide>
      <App />
    </CounterProvide>
  </StrictMode>,
)
