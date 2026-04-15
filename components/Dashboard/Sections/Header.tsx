import Image from "next/image";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = () => {
  return (
    <header className="bg-green-800 border-b border-[#fdc53a]/20 shadow-sm">
        <SidebarTrigger className="absolute top-0 -ml-8 text-white hover:bg-[#fdc53a]/20"/>
        <Link href="/">
            <div className="text_logo flex">
                <Image 
                    src="/hog_logo.png" 
                    width={50}
                    height={50}
                    alt="logo" 
                    className="size-8 2xl:size-10" 
                />
                <h1 className="px-1 text-lg 2xl:text-4xl text-[#fdc53a] font-bold content-center">Hills of Glory</h1>
                <h1 className="px-1 text-lg 2xl:text-4xl content-center">Mabalacat</h1>
            </div>
        </Link>
    </header>
  )
}

export default Header