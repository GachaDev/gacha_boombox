import {createRoot} from 'react-dom/client';
import { VisibilityProvider } from './providers/VisibilityProvider';
import App from './components/App';
import './App.css'
const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
  <VisibilityProvider>
    <App />
  </VisibilityProvider>
);
