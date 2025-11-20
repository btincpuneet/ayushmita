import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Home />
    </HelmetProvider>
  )
}

export default App
