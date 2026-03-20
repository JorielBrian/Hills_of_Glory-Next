const Header = () => {
  return (
    <header className="flex w-full justify-between px-15 py-5 bg-black/60">
        <a href="/">
            <div className="flex">
                <img src="/hog_logo.png" alt="logo" className="size-15" />
                <h1 className="text-3xl text-[#fdc53a] content-center px-1">Hills of Glory</h1><h1 className="text-3xl content-center px-1">Mabalacat</h1>
            </div>
        </a>
        <a href="/dashboard" className="inline-block text-xl hover:underline leading-normal" > Dashboard </a>
    </header>
  )
}

export default Header