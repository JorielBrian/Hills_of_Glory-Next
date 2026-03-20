'use client';

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"

const Aside = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-[#182920]">
      <nav className="flex-1 flex flex-col p-2 space-y-2">
        <a href="/dashboard" className={cn("aside_button", { "aside_button_active": pathname === "/dashboard" })}>
          Home
        </a>
        <a href="/dashboard/members" className={cn("aside_button", { "aside_button_active": pathname === "/dashboard/members" })}>
          Members
        </a>
        <a href="/dashboard/lifegroups" className={cn("aside_button", { "aside_button_active": pathname === "/dashboard/lifegroups" })}>
          Life Groups
        </a>
      </nav>
    </aside>
  )
}

export default Aside