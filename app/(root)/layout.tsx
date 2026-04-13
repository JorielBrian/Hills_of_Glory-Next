import React from 'react'
import Header from "@/components/Sections/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full bg-[url(/background_one.jpg)] bg-center bg-cover bg-fixed">
      <div className="bg-black/70">
        <Header />
        {children}
      </div>
    </main>
  )
}

export default layout