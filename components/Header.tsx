import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"

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
        <Link href="/">
            <div className="flex text-xl 2xl:text-3xl">
                <img src="/hog_logo.png" alt="logo" className="size-10 2xl:size-15" />
                <h1 className="text-[#fdc53a] content-center px-1">Hills of Glory</h1><h1 className="content-center px-1">Mabalacat</h1>
            </div>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className="home_nav_button">
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="bg-transparent w-fit">
              <NavigationMenuTrigger className="home_nav_button">Ministries</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-black/70 w-9">
                <ul className="p-2 flex flex-col gap-4 w-72">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link href={`/${item.href}`} className="home_dropdown_item text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className="home_nav_button">
                  <Link href="/">Services</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className="home_nav_button">
                <Link href="/">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        <Button 
          variant="outline"
          className="bg-black-700/50 border-gray-500"
          asChild
        >
          {/* <Link href="/dashboard">Dashboard</Link> */}
          <Link href="/sign-in">Sign In</Link>
        </Button>
    </header>
  )
}

export default Header