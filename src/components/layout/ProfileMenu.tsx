import { Menu } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const triggerClass =
  "grid size-10 cursor-pointer place-items-center rounded-full border border-border bg-background transition-shadow duration-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-foreground data-[state=open]:shadow-md";

/** Hamburger trigger opening the account/navigation menu. No profile avatar is rendered. */
export function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="Open menu" className={triggerClass}>
        <Menu aria-hidden="true" className="size-[18px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-60 rounded-xl py-2 shadow-lg">
        <DropdownMenuItem className="px-4 py-2.5 font-semibold">Sign up</DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-2.5">Log in</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="px-4 py-2.5">Airbnb your home</DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-2.5">Help Centre</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}