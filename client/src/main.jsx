import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {CssBaseline} from "@mui/material";
import {HelmetProvider} from "react-helmet-async"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* applies basic css to it like margin, padding =0 */}
    <HelmetProvider>
       <CssBaseline/> 
      <div onContextMenu={(e) => e.preventDefault()}>
        <App />
      </div> 
    </HelmetProvider>
  </StrictMode>,
)
