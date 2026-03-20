import Header from "@/components/Header"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-black/50 h-screen">
        <Header />
          {children}
    </main>
  )
}

export default Layout