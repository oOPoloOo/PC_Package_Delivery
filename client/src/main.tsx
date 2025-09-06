import { SearchProvider } from './contexts/SearchContext.tsx';
import { PackageProvider } from './contexts/PackageContext.tsx';
import { BrowserRouter } from 'react-router';
import { createRoot } from 'react-dom/client';
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
 <BrowserRouter>
    <PackageProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </PackageProvider>
  </BrowserRouter>
)
