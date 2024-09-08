"use client";

import { DatePicker } from "@/components/form/DatePicker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePageTitle } from "@/contexts/PageTitleContext";
import { Sales } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function PenjualanPage() {
  const { setTitle } = usePageTitle();
  const [sales, setSales] = useState<Sales[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const fetchSales = async () => {
    try {
      const response = await fetch("/api/sales");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: Sales[] = await response.json();
      setSales(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const filteredData = sales.filter((sale) => {
    const saleDate = new Date(sale.date);
    const dateInRange =
      (!startDate || saleDate >= startDate) &&
      (!endDate || saleDate <= endDate);
    const matchesCustomer = sale.customer
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return dateInRange && matchesCustomer;
  });

  const totalJumlah = filteredData.reduce(
    (acc, sale) => acc + (sale.amount ?? 0),
    0
  );
  const totalTagihan = filteredData.reduce(
    (acc, sale) => acc + (sale.bill ?? 0),
    0
  );

  useEffect(() => {
    setTitle("Faktur Penjualan");
    fetchSales();
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
            {filteredData.length === 0 ? (
              <div className="text-center p-4">Data kosong</div>
            ) : (
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
                      <td className="border border-gray-300 p-2 font-medium hover:cursor-pointer">
                        <Link href={`penjualan/${payment.id}`}>
                          {payment.invoiceNumber}
                        </Link>
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
                        {payment.bill === 0 ||
                        payment.bill === null ||
                        payment.bill === undefined
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
            )}
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
