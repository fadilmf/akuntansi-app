"use client";

import React, { useEffect, useState } from "react";
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
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ScrollArea } from "./ui/scroll-area";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar({ isOpen, toggleSidebar }: any) {
  const router = useRouter();
  const pathname = usePathname();

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize(); // Set initial state based on screen size
    window.addEventListener("resize", handleResize);

    if (isDesktop) {
      toggleSidebar(true);
    } else {
      toggleSidebar(false);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [isDesktop]);

  const menuList = [
    {
      items: [
        {
          link: "/",
          // icon: <Home />,
          text: "Home",
        },
      ],
    },
    {
      group: {
        text: "Keuangan",
        // icon: <ShoppingBasket />,
      },
      items: [
        {
          link: "#",
          icon: "",
          text: "Kas & Bank",
        },
        {
          link: "#",
          icon: "",
          text: "Pengajuan Dana",
        },
      ],
    },
    {
      group: {
        text: "Penjualan",
        // icon: <ChartArea />,
      },
      items: [
        {
          link: "/penjualan",
          // icon: <ChartArea />,
          text: "Faktur Penjualan",
        },
        {
          link: "#",
          // icon: <Tag />,
          text: "Sales Order",
        },
        {
          link: "#",
          // icon: <Tag />,
          text: "Penawaran Harga",
        },
      ],
    },
    {
      group: {
        text: "Pembelian",
        // icon: <ChartArea />,
      },
      items: [
        {
          link: "/pembelian",
          // icon: <ChartArea />,
          text: "Faktur Pembelian",
        },
        {
          link: "#",
          // icon: <Tag />,
          text: "Order Pembelian",
        },
        {
          link: "#",
          // icon: <Tag />,
          text: "Permintaan Pembelian",
        },
      ],
    },
    {
      group: {
        text: "Warehouse",
        // icon: <ChartArea />,
      },
      items: [
        {
          link: "#",
          icon: "",
          text: "Penerimaan Barang",
        },
        {
          link: "#",
          icon: "",
          text: "Pengiriman Barang",
        },
        {
          link: "#",
          icon: "",
          text: "Inventory",
        },
      ],
    },
    // {
    //   items: [
    //     {
    //       link: "/kontak",
    //       icon: <IdCard />,
    //       text: "Kontak",
    //     },
    //   ],
    // },
    {
      items: [
        {
          link: "#",
          // icon: <Banknote />,
          text: "Produk",
        },
      ],
    },
    {
      items: [
        {
          link: "#",
          // icon: <Banknote />,
          text: "Payroll",
        },
      ],
    },
    {
      items: [
        {
          link: "#",
          // icon: <Banknote />,
          text: "Asset Tetap",
        },
      ],
    },
    {
      items: [
        {
          link: "#",
          // icon: <Banknote />,
          text: "Laporan",
        },
      ],
    },
    // {
    //   group: {
    //     text: "Data Master",
    //     // icon: <ChartArea />,
    //   },
    //   items: [
    //     {
    //       link: "#",
    //       // icon: <Banknote />,
    //       text: "Chart of Account",
    //     },
    //     {
    //       link: "#",
    //       // icon: <Banknote />,
    //       text: "Kontak",
    //     },
    //     {
    //       link: "#",
    //       // icon: <Banknote />,
    //       text: "Pajak",
    //     },
    //     {
    //       link: "#",
    //       // icon: <Banknote />,
    //       text: "Kode Proyek",
    //     },
    //   ],
    // },
    // {
    //   items: [
    //     {
    //       link: "#",
    //       text: "Pengaturan",
    //     },
    //   ],
    // },
  ];

  const bottomMenuList = [
    {
      group: {
        text: "Data Master",
        // icon: <ChartArea />,
      },
      items: [
        {
          link: "#",
          // icon: <Banknote />,
          text: "Chart of Account",
        },
        {
          link: "#",
          // icon: <Banknote />,
          text: "Kontak",
        },
        {
          link: "#",
          // icon: <Banknote />,
          text: "Pajak",
        },
        {
          link: "#",
          // icon: <Banknote />,
          text: "Kode Proyek",
        },
      ],
    },
    {
      items: [
        {
          link: "#",
          text: "Pengaturan",
        },
      ],
    },
  ];
  return (
    <div
      className={`fixed z-50 h-screen flex flex-col w-full md:w-[300px] min-w-[300px] border-r min-h-screen p-4 gap-4 bg-white transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex gap-2 justify-between items-center">
        <Link
          href={"/"}
          className="font-bold text-4xl flex justify-center py-2"
          onClick={() => toggleSidebar(false)}
        >
          <Image src={"/logo_web.png"} alt="logo" width={200} height={200} />
        </Link>
        <button
          onClick={toggleSidebar}
          className="md:hidden self-end text-2xl mb-4"
        >
          ✕
        </button>
      </div>
      <ScrollArea className="h-96 grow">
        <Accordion type="multiple">
          {menuList.map((menu, key) =>
            menu.group ? (
              <AccordionItem
                key={key}
                value={`item-${key}`}
                className="border-0"
              >
                <AccordionTrigger className="hover:bg-gray-100 px-4 py-2 rounded-md hover:no-underline">
                  <span className="flex gap-2">
                    {/* {menu.group.icon} */}
                    {menu.group.text}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {menu.items.map((option, optionKey) => (
                    <Link
                      key={optionKey}
                      href={option.link}
                      className={`flex gap-2 px-4 py-2 cursor-pointer rounded-md ${
                        pathname === option.link
                          ? "bg-gray-200 text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => toggleSidebar(false)}
                    >
                      {/* {option.icon} */}
                      <span>{option.text}</span>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ) : (
              menu.items.map((option, optionKey) => (
                <Link
                  key={optionKey}
                  href={option.link}
                  className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md ${
                    pathname === option.link
                      ? "bg-gray-200 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => toggleSidebar(false)}
                >
                  {/* {option.icon} */}
                  <span>{option.text}</span>
                </Link>
              ))
            )
          )}
        </Accordion>
      </ScrollArea>

      {/* <ScrollArea className="h-96 grow">
        <Command style={{ overflow: "visible" }}>
          <CommandList style={{ overflow: "visible" }}>
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
      </ScrollArea> */}
      <div>
        <Accordion type="single" collapsible>
          {bottomMenuList.map((menu, key) =>
            menu.group ? (
              <AccordionItem
                key={key}
                value={`item-${key}`}
                className="border-0"
              >
                <AccordionTrigger className="hover:bg-gray-100 px-4 py-2 rounded-md hover:no-underline">
                  <span className="flex gap-2">
                    {/* {menu.group.icon} */}
                    {menu.group.text}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {menu.items.map((option, optionKey) => (
                    <Link
                      key={optionKey}
                      href={option.link}
                      className={`flex gap-2 px-4 py-2 cursor-pointer rounded-md ${
                        pathname === option.link
                          ? "bg-gray-200 text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => toggleSidebar(false)}
                    >
                      {/* {option.icon} */}
                      <span>{option.text}</span>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ) : (
              menu.items.map((option, optionKey) => (
                <Link
                  key={optionKey}
                  href={option.link}
                  className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md ${
                    pathname === option.link
                      ? "bg-gray-200 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => toggleSidebar(false)}
                >
                  {/* {option.icon} */}
                  <span>{option.text}</span>
                </Link>
              ))
            )
          )}
        </Accordion>
      </div>
    </div>
  );
}
