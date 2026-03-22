import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {

  const items = [
    {
      name: "Administration & Extension Ministry",
      href: "ministry/administration"
    },
    {
      name: "Consolidation Ministry",
      href: "ministry/consolidation"
    },
    {
      name: "Creative Ministry",
      href: "ministry/creative"
    },
    {
      name: "Education Ministry",
      href: "ministry/education"
    },
    {
      name: "Events Ministry",
      href: "ministry/events"
    },
    {
      name: "Finance Ministry",
      href: "ministry/finance"
    },
    {
      name: "Hills Kids Ministry",
      href: "ministry/hills-kids"
    },
    {
      name: "Hospitality Ministry",
      href: "ministry/hospitality"
    },
    {
      name: "Music and Arts Ministry",
      href: "ministry/music-and-arts"
    }
  ];


  return (
    <header>
        <a href="/">
            <div className="flex text-xl 2xl:text-3xl">
                <img src="/hog_logo.png" alt="logo" className="size-10 2xl:size-15" />
                <h1 className="text-[#fdc53a] content-center px-1">Hills of Glory</h1><h1 className="content-center px-1">Mabalacat</h1>
            </div>
        </a>
        <div className="flex w-1/3 justify-between">
          <Button className="home_nav_button">
            <a href="/">Home</a>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="home_nav_button">
                Ministries
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/20 w-fit">
              {items.map((item) => (
                <DropdownMenuItem key={item.name}>
                  <a href={`/${item.href}`}>
                    <Button className="home_dropdown_item">
                      {item.name}
                    </Button>
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="home_nav_button">
            <a href="/">Services</a>
          </Button>
          <Button className="home_nav_button">
            <a href="/">About</a>
          </Button>
        </div>
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