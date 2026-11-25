import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ApiError } from './lib/api.ts'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof ApiError && error.status === 401) {
        queryClient.setQueryData(["session"], null); // guards then redirect to /login
      }
    },
  }),
});

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
  </StrictMode>,
)
