import React from "react";
import ProfileCard from "./ProfileCard";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import {
  Banknote,
  ChartArea,
  Home,
  IdCard,
  ShoppingBasket,
  Tag,
} from "lucide-react";
import { group } from "console";
import Link from "next/link";

export default function Sidebar() {
  const menuList = [
    {
      items: [
        {
          link: "/",
          icon: <Home />,
          text: "Home",
        },
      ],
    },
    {
      group: "Penjualan",
      items: [
        {
          link: "/",
          icon: <ChartArea />,
          text: "Overview Penjualan",
        },
        {
          link: "/",
          icon: <Tag />,
          text: "Tagihan",
        },
        {
          link: "#",
          icon: <Tag />,
          text: "Pengiriman",
        },
        {
          link: "#",
          icon: <Tag />,
          text: "Pemesanan",
        },
        {
          link: "#",
          icon: <Tag />,
          text: "Penawaran",
        },
      ],
    },
    {
      group: "Pembelian",
      items: [
        {
          link: "/pembelian",
          icon: <ChartArea />,
          text: "Overview Pembelian",
        },
        {
          link: "#",
          icon: <Tag />,
          text: "Tagihan Pembelian",
        },
        {
          link: "#",
          icon: <Tag />,
          text: "Pengiriman Pembelian",
        },
        {
          link: "#",
          icon: <Tag />,
          text: "Pesanan Pembelian",
        },
        {
          link: "#",
          icon: <Tag />,
          text: "Penawaran Pembelian",
        },
      ],
    },
    {
      items: [
        {
          link: "/kontak",
          icon: <IdCard />,
          text: "Kontak",
        },
      ],
    },
    {
      items: [
        {
          link: "/",
          icon: <Banknote />,
          text: "Kas & Bank",
        },
      ],
    },
    {
      items: [
        {
          link: "/",
          icon: <Home />,
          text: "Home",
        },
      ],
    },
  ];
  return (
    <div className="fixed flex bg-white flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4 gap-4">
      <div className="font-bold text-4xl flex justify-center py-2">Logo</div>
      <div className="grow h-full">
        <Command style={{ overflow: "visible" }}>
          {/* <CommandInput placeholder="Type a command or search..." /> */}
          <CommandList style={{ overflow: "visible" }}>
            {/* <CommandEmpty>No results found.</CommandEmpty> */}
            {menuList.map((menu, key) => (
              <CommandGroup key={key} heading={menu.group}>
                {menu.items.map((option, optionKey) => (
                  <Link
                    key={optionKey}
                    href={option.link}
                    className="flex gap-2 cursor-pointer"
                  >
                    <CommandItem className="flex gap-2 cursor-pointer w-full">
                      {option.icon}
                      {option.text}
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>
      <ProfileCard />
    </div>
  );
}
