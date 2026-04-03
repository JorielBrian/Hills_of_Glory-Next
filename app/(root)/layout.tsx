import React from 'react'
import Header from "@/components/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full bg-[url(/background_one.jpg)] bg-center bg-cover bg-fixed">
      <div className="bg-black/60">
        <Header />
        {children}
      </div>
    </main>
  )
}

export default layout