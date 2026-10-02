import { Menu, UserRound } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Profile menu"
        className="flex h-12 cursor-pointer items-center gap-3 rounded-full border border-border bg-background pl-3.5 pr-1.5 transition-shadow duration-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-foreground data-[state=open]:shadow-md"
      >
        <Menu aria-hidden="true" className="size-4" />
        <UserRound
          aria-hidden="true"
          className="size-8 rounded-full bg-muted-foreground p-1 text-background"
        />
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
