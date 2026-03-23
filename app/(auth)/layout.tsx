import Link from 'next/link'
import { ReactNode } from 'react'

const Layout = ({children}: { children: ReactNode }) => {
  return (
    <main className="min-h-full bg-[url(/background_one.jpg)] bg-cover bg-fixed">
      <div className="flex h-screen p-5 bg-black/60 items-center justify-center">
        <section className='flex flex-col w-4/5 2xl:w-1/4 h-fit p-5 items-center bg-black/20 rounded-xl'> 
            <Link href='/' className="text_logo flex mb-5 w-fit text-xl justify-center 2xl:text-3xl">
                <img src="/hog_logo.png" alt="logo" className="size-10 2xl:size-15" />
                <div className='sm:flex'>
                  <h1 className="text-[#fdc53a] content-center px-1">Hills of Glory</h1>
                  <h1 className="content-center px-1">Mabalacat</h1>
                </div>
            </Link>       
            {children}
        </section>
      </div>
    </main>
  )
}

export default Layout