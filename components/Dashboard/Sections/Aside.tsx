'use client';

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ImHome } from "react-icons/im"; //<ImHome />
import { FaPeopleRoof } from "react-icons/fa6"; //<FaPeopleRoof />
import { MdGroups } from "react-icons/md"; //<MdGroups />
import { Button } from "@/components/ui/button";

const Aside = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-emerald-950">
      <nav className="flex-1 flex flex-col p-2 space-y-2">
        <Button 
          variant="link" 
          className={cn("aside_button", { "aside_button_active": pathname === "/dashboard" })}
          asChild
        >
          <a href="/dashboard">
            <ImHome className="aside_icon w-1/2" />
            <div className="flex justify-center w-3/4">
              Home
            </div>
          </a>
        </Button>
        <Button 
          variant="link" 
          className={cn("aside_button", { "aside_button_active": pathname === "/dashboard/members" })}
          asChild
        >
          <a href="/dashboard/members">
            <MdGroups className="aside_icon" /> 
            <div className="flex justify-center w-3/4">
              Members
            </div>
          </a>
        </Button>
        <Button 
          variant="link" 
          className={cn("aside_button", { "aside_button_active": pathname === "/dashboard/lifegroups" })}
          asChild
        >
          <a href="/dashboard/lifegroups">
            <FaPeopleRoof className="aside_icon" />
            <div className="flex justify-center w-3/4">
              Life Groups
            </div>
          </a>
        </Button>
      </nav>
    </aside>
  )
}

export default Aside