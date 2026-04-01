import { Avatar } from "@/components/ui/avatar";
import { IoPersonCircle } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-[#b8bd9e]">
        <Link href="/">
            <div className="text_logo flex">
                <Image src="/hog_logo.png" alt="logo" className="size-8 2xl:size-10" />
                <h1 className="px-1 text-lg 2xl:text-4xl text-[#fdc53a] font-bold content-center">Hills of Glory</h1>
                <h1 className="px-1 text-lg 2xl:text-4xl content-center">Mabalacat</h1>
            </div>
        </Link>
        <Avatar className="size-15 text-gray-500">
            <IoPersonCircle className="size-full"/>
        </Avatar>
    </header>
  )
}

export default Header