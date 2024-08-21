"use client";

import {
  ChevronDown,
  Menu,
  ShoppingBag,
  ShoppingBasket,
  User,
} from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePageTitle } from "@/contexts/PageTitleContext";
import Sidebar from "./Sidebar";

// export default function Navbar() {
//   const { setTitle, title } = usePageTitle();
//   return (
//     <div className="border-b p-6 bg-white flex justify-between items-center">
//       <div className="flex gap-2">
//         <h1 className="text-xl font-bold">{title}</h1>
//         {/* <Link href={"/penjualan"}>
//           <Button variant={"outline"} className="flex gap-2">
//             <ShoppingBasket />
//             Jual
//           </Button>
//         </Link>
//         <Link href={"/pembelian/tambah-pembelian"}>
//           <Button variant={"outline"} className="flex gap-2">
//             <ShoppingBag />
//             Beli
//           </Button>
//         </Link> */}
//       </div>

//       <div className="flex gap-2">
//         <h2 className="font-semibold">Yedi Casman -</h2>
//         <DropdownMenu>
//           <DropdownMenuTrigger className="flex gap-2">
//             <span className="italic">Director</span>
//             <ChevronDown />
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>My Account</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Profile</DropdownMenuItem>
//             <DropdownMenuItem>Billing</DropdownMenuItem>
//             <DropdownMenuItem>Team</DropdownMenuItem>
//             <DropdownMenuItem>Subscription</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </div>
//   );
// }

export default function Navbar({ isSidebarOpen, toggleSidebar }: any) {
  const { title } = usePageTitle();
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

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
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <div className="hidden md:flex gap-2 mt-4 lg:mt-0">
          <h2 className="font-semibold">Yedi Casman -</h2>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-2">
              <span className="italic">Director</span>
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
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
                <h2 className="font-semibold">Yedi Casman</h2>
                <span className="italic">Director</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
