import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <header className="flex flex-col 2xl:flex-row w-full justify-between px-15 py-5">
        <a href="/">
            <div className="flex text-xl 2xl:text-3xl">
                <img src="/hog_logo.png" alt="logo" className="size-10 2xl:size-15" />
                <h1 className="text-[#fdc53a] content-center px-1">Hills of Glory</h1><h1 className="content-center px-1">Mabalacat</h1>
            </div>
        </a>
        <Button 
          variant="outline"
          className="bg-black-700/50 border-gray-500"
          asChild
        >
          <a href="/dashboard">Dashboard</a>
        </Button>
    </header>
  )
}

export default Header