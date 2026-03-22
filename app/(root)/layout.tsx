import React from 'react'
import Header from "@/components/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-[url(/background_one.jpg)] bg-cover bg-fixed">
      <div className="h-screen p-5 bg-black/60">
        <Header />
        {children}
      </div>
    </main>
  )
}

export default layout