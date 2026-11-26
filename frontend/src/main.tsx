import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './lib/leafletVelocitySetup';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './components/ui/ratra';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider platform="disaster" defaultTheme="light">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
