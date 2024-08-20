"use client";

import { DatePicker } from "@/components/form/DatePicker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export default function PenjualanPage() {
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
    setTitle("Faktur Penjualan");
  }, [setTitle]);

  return (
    <div className="p-4">
      <Card className="p-4">
        <div className="flex justify-between mb-4">
          <div className="flex items-center space-x-4">
            <label className="font-semibold">Pencarian:</label>
            <Input
              placeholder="Semua Customer"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="font-semibold">Tanggal:</label>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="text-right">Jumlah</TableHead>
              <TableHead className="text-right">Tagihan</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((payment, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{payment.invoice}</TableCell>
                <TableCell>
                  {new Date(payment.date).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell>{payment.customer}</TableCell>
                <TableCell>{payment.subject}</TableCell>
                <TableCell className="text-right">
                  {payment.jumlah.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  {payment.tagihan.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </TableCell>
                <TableCell
                  className={`${
                    payment.status === "open"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {payment.status.charAt(0).toUpperCase() +
                    payment.status.slice(1)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} className="font-semibold text-right">
                Total
              </TableCell>
              <TableCell className="text-right font-semibold">
                {totalJumlah.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {totalTagihan.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Button className="bg-blue-500 hover:bg-blue-600">
          Buat Invoice Baru
        </Button>
      </Card>
    </div>
  );
}
