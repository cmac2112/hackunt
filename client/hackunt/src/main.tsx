import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

const DOMAIN = import.meta.env.DOMAIN
const CLIENTID = import.meta.env.CLIENTID

createRoot(document.getElementById('root')!).render(
    <Auth0Provider
      domain="dev-jel7yj2ufa56jbkj.us.auth0.com"
      clientId='7uBuee695VtCob7p9PxNYGiz1RiTOv7w'
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
);
