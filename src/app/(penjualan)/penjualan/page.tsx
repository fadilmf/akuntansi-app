// "use client";

// import { DatePicker } from "@/components/form/DatePicker";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { usePageTitle } from "@/contexts/PageTitleContext";
// import React, { useEffect, useState } from "react";

// const data: Payment[] = [
//   {
//     invoice: "INV24001",
//     date: "2024-01-03",
//     customer: "Senja Utama Abadi, PT",
//     subject: "Rental Alat Berat",
//     jumlah: 100000000,
//     tagihan: 100000000,
//     status: "open",
//   },
//   {
//     invoice: "INV24002",
//     date: "2024-01-13",
//     customer: "Waskita Karya, PT",
//     subject: "Sparepart Alat Berat",
//     jumlah: 55000000,
//     tagihan: 0,
//     status: "close",
//   },
//   {
//     invoice: "INV24003",
//     date: "2024-04-24",
//     customer: "Guna Nusa Elec, PT",
//     subject: "Alat-alat Listrik",
//     jumlah: 24300000,
//     tagihan: 14300000,
//     status: "open",
//   },
//   {
//     invoice: "INV24004",
//     date: "2024-06-18",
//     customer: "Alamanda Adidaya, PT",
//     subject: "Jasa Installasi Bangunan",
//     jumlah: 1305000000,
//     tagihan: 1265000000,
//     status: "open",
//   },
//   {
//     invoice: "INV24005",
//     date: "2024-06-30",
//     customer: "Indah Kiat Nusantara, PT",
//     subject: "Structure Bangunan Warehouse",
//     jumlah: 98000000,
//     tagihan: 0,
//     status: "close",
//   },
// ];

// export type Payment = {
//   invoice: string;
//   date: string;
//   customer: string;
//   subject: string;
//   jumlah: number;
//   tagihan: number;
//   status: "open" | "close";
// };

// export default function PenjualanPage() {
//   const { setTitle } = usePageTitle();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [startDate, setStartDate] = useState<Date | undefined>(undefined);
//   const [endDate, setEndDate] = useState<Date | undefined>(undefined);

//   const filteredData = data.filter((payment) => {
//     const paymentDate = new Date(payment.date);
//     const dateInRange =
//       (!startDate || paymentDate >= startDate) &&
//       (!endDate || paymentDate <= endDate);
//     const matchesCustomer = payment.customer
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     return dateInRange && matchesCustomer;
//   });

//   const totalJumlah = filteredData.reduce(
//     (acc, payment) => acc + payment.jumlah,
//     0
//   );
//   const totalTagihan = filteredData.reduce(
//     (acc, payment) => acc + payment.tagihan,
//     0
//   );

//   useEffect(() => {
//     setTitle("Faktur Penjualan");
//   }, [setTitle]);

//   return (
//     <>
//       <div className="p-4 pb-24 w-full">
//         <Card className="p-4 h-full">
//           <div className="flex flex-col lg:flex-row justify-between mb-4">
//             <div className="flex items-center space-x-4">
//               <label className="font-semibold">Pencarian:</label>
//               <Input
//                 placeholder="Semua Customer"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="max-w-sm"
//               />
//             </div>
//             <div className="flex flex-col md:flex-row items-center space-x-4 my-5">
//               <label className="font-semibold">Tanggal:</label>
//               <div className="flex items-center gap-2">
//                 <DatePicker
//                   selectedDate={startDate}
//                   onDateChange={setStartDate}
//                   disabled={(date) => !!endDate && date > endDate}
//                 />
//                 <span>s/d</span>
//                 <DatePicker
//                   selectedDate={endDate}
//                   onDateChange={setEndDate}
//                   disabled={(date) => !!startDate && date < startDate}
//                 />
//               </div>
//             </div>
//           </div>

//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-[100px]">Invoice</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Customer</TableHead>
//                 <TableHead>Subject</TableHead>
//                 <TableHead className="text-right">Jumlah</TableHead>
//                 <TableHead className="text-right">Tagihan</TableHead>
//                 <TableHead>Status</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredData.map((payment, index) => (
//                 <TableRow key={index} className="h-2">
//                   <TableCell className="font-medium">
//                     {payment.invoice}
//                   </TableCell>
//                   <TableCell>
//                     {new Date(payment.date).toLocaleDateString("id-ID")}
//                   </TableCell>
//                   <TableCell>{payment.customer}</TableCell>
//                   <TableCell>{payment.subject}</TableCell>
//                   <TableCell className="text-right">
//                     {payment.jumlah.toLocaleString("id-ID", {
//                       style: "decimal",
//                     })}
//                   </TableCell>
//                   <TableCell className="text-right">
//                     {payment.tagihan === 0
//                       ? "-"
//                       : payment.tagihan.toLocaleString("id-ID", {
//                           style: "decimal",
//                         })}
//                   </TableCell>
//                   <TableCell
//                     className={`${
//                       payment.status === "open"
//                         ? "text-red-500"
//                         : "text-green-500"
//                     }`}
//                   >
//                     {payment.status.charAt(0).toUpperCase() +
//                       payment.status.slice(1)}
//                   </TableCell>
//                 </TableRow>
//               ))}

//               {/* <TableRow className="absolute">
//                 <TableCell colSpan={4} className="font-semibold text-right">
//                   Total
//                 </TableCell>
//                 <TableCell className="text-right font-semibold">
//                   {totalJumlah.toLocaleString("id-ID", {
//                     style: "decimal",
//                   })}
//                 </TableCell>
//                 <TableCell className="text-right font-semibold">
//                   {totalTagihan.toLocaleString("id-ID", {
//                     style: "currency",
//                     currency: "IDR",
//                   })}
//                 </TableCell>
//                 <TableCell></TableCell>
//               </TableRow> */}
//             </TableBody>

//             {/* <TableFooter>
//               <TableRow>
//                 <TableCell colSpan={4}>Total</TableCell>
//                 <TableCell className="text-right font-semibold">
//                   {totalJumlah.toLocaleString("id-ID", {
//                     style: "decimal",
//                   })}
//                 </TableCell>
//                 <TableCell className="text-right font-semibold">
//                   {totalTagihan.toLocaleString("id-ID", {
//                     style: "decimal",
//                   })}
//                 </TableCell>
//                 <TableCell></TableCell>
//               </TableRow>
//             </TableFooter> */}
//           </Table>

//           {/* <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-[100px]">Invoice</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Method</TableHead>
//                 <TableHead className="text-right">Amount</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               <ScrollArea>
//                 <TableRow>
//                   <TableCell className="font-medium">asdasdasd</TableCell>
//                   <TableCell>asdas</TableCell>
//                   <TableCell>asdasd</TableCell>
//                   <TableCell className="text-right">asdasdasd</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell className="font-medium">asdasdasd</TableCell>
//                   <TableCell>asdas</TableCell>
//                   <TableCell>asdasd</TableCell>
//                   <TableCell className="text-right">asdasdasd</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell className="font-medium">asdasdasd</TableCell>
//                   <TableCell>asdas</TableCell>
//                   <TableCell>asdasd</TableCell>
//                   <TableCell className="text-right">asdasdasd</TableCell>
//                 </TableRow>
//               </ScrollArea>
//             </TableBody>
//             <TableFooter>
//               <TableRow>
//                 <TableCell colSpan={3}>Total</TableCell>
//                 <TableCell className="text-right">$2,500.00</TableCell>
//               </TableRow>
//             </TableFooter>
//           </Table> */}
//         </Card>
//       </div>

//       <div className="fixed bottom-5 ml-4 z-20">
//         <Button className="bg-blue-500 hover:bg-blue-600">
//           Buat Invoice Baru
//         </Button>
//       </div>

//       {/* Baris Total di bagian bawah halaman */}
//       <div className="fixed bottom-0 left-0 w-screen p-4 bg-white border-t shadow-md z-10">
//         <div className="flex justify-end items-center gap-2">
//           <div className="font-semibold">Total Jumlah:</div>
//           <div className="text-right font-semibold">
//             {totalJumlah.toLocaleString("id-ID", {
//               style: "decimal",
//             })}
//           </div>
//         </div>
//         <div className="flex justify-end items-center gap-2">
//           <div className="font-semibold">Total Tagihan:</div>
//           <div className="text-right font-semibold">
//             {totalTagihan.toLocaleString("id-ID", {
//               style: "decimal",
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { DatePicker } from "@/components/form/DatePicker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePageTitle } from "@/contexts/PageTitleContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export type Payment = {
  invoiceNumber: string;
  date: string;
  customer: string;
  subject: string;
  amount: number;
  bill: number;
  status: "open" | "close";
};

export default function PenjualanPage() {
  const { setTitle } = usePageTitle();
  const [penjualan, setPenjualan] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const fetchPayments = async () => {
    try {
      const response = await fetch("/api/sales");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: Payment[] = await response.json();
      console.log("ini data penjualan: ", data);
      setPenjualan(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const filteredData = penjualan.filter((payment) => {
    const paymentDate = new Date(payment.date);
    const dateInRange =
      (!startDate || paymentDate >= startDate) &&
      (!endDate || paymentDate <= endDate);
    const matchesCustomer = payment.customer
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return dateInRange && matchesCustomer;
  });

  const totalJumlah = filteredData.reduce(
    (acc, payment) => acc + payment.amount,
    0
  );
  const totalTagihan = filteredData.reduce(
    (acc, payment) => acc + payment.bill,
    0
  );

  useEffect(() => {
    setTitle("Faktur Penjualan");
    fetchPayments();
  }, [setTitle]);

  return (
    <>
      <div className="p-4 pb-24 w-full">
        <Card className="p-4 h-full">
          <div className="flex flex-col lg:flex-row justify-between mb-4">
            <div className="flex items-center space-x-4">
              <label className="font-semibold">Pencarian:</label>
              <Input
                placeholder="Semua Customer"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center space-x-4 my-5">
              <label className="font-semibold">Tanggal:</label>
              <div className="flex items-center gap-2">
                <DatePicker
                  selectedDate={startDate}
                  onDateChange={setStartDate}
                  disabled={(date) => !!endDate && date > endDate}
                />
                {/* <Input value={startDate} placeholder="Masukkan tanggal" type="date" /> */}
                <span>s/d</span>
                <DatePicker
                  selectedDate={endDate}
                  onDateChange={setEndDate}
                  disabled={(date) => !!startDate && date < startDate}
                />
                {/* <Input placeholder="Masukkan tanggal" type="date" /> */}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2 w-[100px]">
                    Invoice
                  </th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Customer</th>
                  <th className="border border-gray-300 p-2">Subject</th>
                  <th className="border border-gray-300 p-2">Jumlah</th>
                  <th className="border border-gray-300 p-2">Tagihan</th>
                  <th className="border border-gray-300 p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((payment, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2 font-medium">
                      {payment.invoiceNumber}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {new Date(payment.date).toLocaleDateString("id-ID")}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {payment.customer}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {payment.subject}
                    </td>
                    <td className="border border-gray-300 p-2 text-right">
                      {payment.amount?.toLocaleString("id-ID", {
                        style: "decimal",
                      })}
                    </td>
                    <td className="border border-gray-300 p-2 text-right">
                      {payment.bill === 0 || payment.bill === null
                        ? "-"
                        : payment.bill.toLocaleString("id-ID", {
                            style: "decimal",
                          })}
                    </td>
                    <td
                      className={`border border-gray-300 p-2 ${
                        payment.status === "open"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {/* {payment.status.charAt(0).toUpperCase() +
                        payment.status.slice(1)} */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="fixed bottom-5 ml-4 z-20">
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Link href={"/penjualan/formulir"}>Buat Invoice Baru</Link>
        </Button>
      </div>

      {/* Baris Total di bagian bawah halaman */}
      <div className="fixed bottom-0 left-0 w-screen p-4 bg-white border-t shadow-md z-10">
        <div className="flex justify-end items-center gap-2">
          <div className="font-semibold">Total Jumlah:</div>
          <div className="text-right font-semibold">
            {totalJumlah.toLocaleString("id-ID", {
              style: "decimal",
            })}
          </div>
        </div>
        <div className="flex justify-end items-center gap-2">
          <div className="font-semibold">Total Tagihan:</div>
          <div className="text-right font-semibold">
            {totalTagihan.toLocaleString("id-ID", {
              style: "decimal",
            })}
          </div>
        </div>
      </div>
    </>
  );
}
