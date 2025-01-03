import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import { routes } from './Core/Routes';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Pages/Auths/AuthProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <div className="max-w-screen-xl mx-auto">
            <RouterProvider router={routes} />
          </div>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>,
)
