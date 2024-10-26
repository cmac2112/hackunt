import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

const DOMAIN = import.meta.env.DOMAIN
const CLIENTID = import.meta.env.CLIENTID

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={DOMAIN}
      clientId={CLIENTID}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
