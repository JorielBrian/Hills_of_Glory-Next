const Header = () => {
  return (
    <header className="bg-[#d9dfbc]">
        <a href="/">
            <div className="flex text-shadow-lg">
                <img src="/hog_logo.png" alt="logo" className="size-8 2xl:size-10" />
                <h1 className="px-1 text-lg 2xl:text-4xl text-[#fdc53a] font-bold content-center">Hills of Glory</h1>
                <h1 className="px-1 text-lg 2xl:text-4xl content-center">Mabalacat</h1>
            </div>
        </a>
    </header>
  )
}

export default Header