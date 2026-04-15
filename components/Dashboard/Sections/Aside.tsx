'use client';

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ImHome } from "react-icons/im"; //<ImHome />
import { FaPeopleRoof } from "react-icons/fa6"; //<FaPeopleRoof />
import { MdGroups } from "react-icons/md"; //<MdGroups />
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import ProfileAvatar from "../ProfileAvatar";

const Aside = () => {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-[#b8bd9e]">
      <SidebarHeader />
      <SidebarContent>
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
      </SidebarContent>
      <SidebarFooter>
        <ProfileAvatar />
      </SidebarFooter>
    </Sidebar>
  )
}

export default Aside