import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='bg-black/60'>
        <nav>this is dashboard layout</nav>
        {children}
    </main>
  )
}

export default Layout