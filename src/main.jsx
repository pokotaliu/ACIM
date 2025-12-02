import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log('[DEBUG MAIN] main.jsx started executing')

const rootElement = document.getElementById('root')
console.log('[DEBUG MAIN] Root element found:', !!rootElement)

if (!rootElement) {
  console.error('[DEBUG MAIN] ❌ FATAL: Root element not found!')
} else {
  try {
    console.log('[DEBUG MAIN] Creating React root...')
    const root = createRoot(rootElement)

    console.log('[DEBUG MAIN] React root created, starting render...')
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    console.log('[DEBUG MAIN] ✅ render() called successfully')
  } catch (error) {
    console.error('[DEBUG MAIN] ❌ Error during React initialization:', error)
    console.error('[DEBUG MAIN] Error stack:', error.stack)

    // Show error on page
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: monospace;">
        <h2>React Initialization Error</h2>
        <pre>${error.message}</pre>
        <pre>${error.stack}</pre>
      </div>
    `
  }
}
