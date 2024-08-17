import { ShoppingBag, ShoppingBasket, User } from "lucide-react";
import React from "react";
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

export default function Navbar() {
  return (
    <div className="border-b p-6 bg-white flex justify-between">
      <div className="flex gap-2">
        <Link href={"/penjualan"}>
          <Button variant={"outline"} className="flex gap-2">
            <ShoppingBasket />
            Jual
          </Button>
        </Link>
        <Link href={"/pembelian/tambah-pembelian"}>
          <Button variant={"outline"} className="flex gap-2">
            <ShoppingBag />
            Beli
          </Button>
        </Link>
      </div>

      {/* <ModeToggle /> */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="bg-white border p-2 rounded-full">
            <User />
          </div>
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
  );
}
