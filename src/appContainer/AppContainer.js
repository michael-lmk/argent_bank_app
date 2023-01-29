import React from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

export const AppContainer = ({children}) => {
  return (
    <div>
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </div>
  )
}
