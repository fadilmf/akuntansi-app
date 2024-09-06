"use client";

import { DatePicker } from "@/components/form/DatePicker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePageTitle } from "@/contexts/PageTitleContext";
import React, { useEffect, useState } from "react";

const data: Payment[] = [
  {
    invoice: "INV24001",
    date: "2024-01-03",
    customer: "Senja Utama Abadi, PT",
    subject: "Rental Alat Berat",
    jumlah: 100000000,
    tagihan: 100000000,
    status: "open",
  },
  {
    invoice: "INV24002",
    date: "2024-01-13",
    customer: "Waskita Karya, PT",
    subject: "Sparepart Alat Berat",
    jumlah: 55000000,
    tagihan: 0,
    status: "close",
  },
  {
    invoice: "INV24003",
    date: "2024-04-24",
    customer: "Guna Nusa Elec, PT",
    subject: "Alat-alat Listrik",
    jumlah: 24300000,
    tagihan: 14300000,
    status: "open",
  },
  {
    invoice: "INV24004",
    date: "2024-06-18",
    customer: "Alamanda Adidaya, PT",
    subject: "Jasa Installasi Bangunan",
    jumlah: 1305000000,
    tagihan: 1265000000,
    status: "open",
  },
  {
    invoice: "INV24005",
    date: "2024-06-30",
    customer: "Indah Kiat Nusantara, PT",
    subject: "Structure Bangunan Warehouse",
    jumlah: 98000000,
    tagihan: 0,
    status: "close",
  },
];

export type Payment = {
  invoice: string;
  date: string;
  customer: string;
  subject: string;
  jumlah: number;
  tagihan: number;
  status: "open" | "close";
};

export default function PembelianPage() {
  const { setTitle } = usePageTitle();
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const filteredData = data.filter((payment) => {
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
    (acc, payment) => acc + payment.jumlah,
    0
  );
  const totalTagihan = filteredData.reduce(
    (acc, payment) => acc + payment.tagihan,
    0
  );

  useEffect(() => {
    setTitle("Faktur Pembelian");
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
                <span>s/d</span>
                <DatePicker
                  selectedDate={endDate}
                  onDateChange={setEndDate}
                  disabled={(date) => !!startDate && date < startDate}
                />
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
                      {payment.invoice}
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
                      {payment.jumlah.toLocaleString("id-ID", {
                        style: "decimal",
                      })}
                    </td>
                    <td className="border border-gray-300 p-2 text-right">
                      {payment.tagihan === 0
                        ? "-"
                        : payment.tagihan.toLocaleString("id-ID", {
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
                      {payment.status.charAt(0).toUpperCase() +
                        payment.status.slice(1)}
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
          Buat Invoice Baru
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
