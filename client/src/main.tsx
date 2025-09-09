import { PackageProvider } from './contexts/PackageContext.tsx';
import { BrowserRouter } from 'react-router';
import { createRoot } from 'react-dom/client';
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
 <BrowserRouter>
    <PackageProvider>
      <App />
    </PackageProvider>
  </BrowserRouter>
)
