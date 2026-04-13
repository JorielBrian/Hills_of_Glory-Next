'use client';
import { useEffect, useState } from "react";
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Image from "next/image";
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

  const [scroll, setScroll] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
      const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Detect scroll direction
      if (currentScrollY > lastScrollY) {
          setScrollDirection('down');
      } else {
          setScrollDirection('up');
      }
      
      // For sticky effect
      setScroll(currentScrollY > 50);
      
      setLastScrollY(currentScrollY);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      animate={{ 
          opacity: scrollDirection === 'up' ? 1 : 0,
          y: scrollDirection === 'down' ? -100 : 0
      }}
      className={scroll ? "flex sticky top-0 py-5! z-50 w-full justify-center bg-black/50" : "flex w-full py-10 justify-center"}
    >
        <Link className="text_logo flex text-xl 2xl:text-3xl" href="/">
          <Image width={50} height={50} src="/hog_logo.png" alt="logo" className="size-10 2xl:size-15" />
          <h1 className="text-[#fdc53a] content-center px-1">Hills of Glory</h1><h1 className="content-center px-1">Mabalacat</h1>
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
          {/* <Link href="/sign-in">Sign In</Link> */}
        </Button>
    </motion.header>
  )
}

export default Header