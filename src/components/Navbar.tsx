"use client";

import {
  ChevronDown,
  Menu,
  ShoppingBag,
  ShoppingBasket,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePageTitle } from "@/contexts/PageTitleContext";
import { useSession, signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function Navbar({ isSidebarOpen, toggleSidebar }: any) {
  const { title } = usePageTitle();

  const user = useCurrentUser();

  return (
    <div>
      <div
        className={`fixed top-0 border-b p-6 bg-white z-0 flex md:flex-row justify-between items-start lg:items-center transition-all duration-300 ${
          isSidebarOpen ? "hidden lg:flex lg:ml-[300px]" : "lg:ml-0 w-full"
        }`}
        style={{
          width: isSidebarOpen ? "calc(100% - 300px)" : "100%",
          marginLeft: isSidebarOpen ? "300px" : "0",
        }}
      >
        <div className="flex gap-2 items-center">
          <Button className="" variant={"outline"} onClick={toggleSidebar}>
            <Menu size={24} />
          </Button>
          <h1 className="text-2xl ml-2 font-bold">{title}</h1>
        </div>
        <div className="hidden md:flex gap-2 mt-4 lg:mt-0">
          <h2 className="font-semibold">{user?.name} -</h2>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-2">
              <span className="italic">Director</span>
              {/* <span className="italic">{session?.user.role}</span> */}
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-2">
              <div className="p-2 rounded-full border">
                <User />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <h2 className="font-semibold">{user?.name}</h2>
                <span className="italic">Director</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/profile"}>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
