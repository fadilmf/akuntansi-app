"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { usePageTitle } from "@/contexts/PageTitleContext";
import { calculateTotal } from "@/lib/calculateTotal";
import { formatDate } from "@/lib/formatDate";
import { Product, SalesProduct } from "@/types/types";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DetailPenjualanPage() {
  const { setTitle } = usePageTitle();

  const router = useRouter();
  const params = useParams();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [isLoading, setIsLoading] = useState(false);

  const [productList, setProductList] = useState<SalesProduct[]>([]);

  const [form, setForm] = useState({
    customer: "",
    quoteNumber: "",
    date: "",
    customerReference: "",
    termOfPayment: "",
    subject: "",
    notes: "",
    amount: 0,
  });

  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [ppn, setPpn] = useState(0);
  const [total, setTotal] = useState(0);

  const handleChange = (index: number, field: string, value: any) => {
    const newList = [...productList];
    newList[index] = { ...newList[index], [field]: value };
    setProductList(newList);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const fetchData = async (id: number) => {
    // Fetch data berdasarkan ID untuk prefill form saat mode edit
    try {
      setIsLoading(true);
      const response = await fetch(`/api/quotes/${id}`);
      const data = await response.json();

      if (!response.ok) {
        // Jika ID tidak ditemukan, tampilkan pesan error
        alert("Data tidak ditemukan.");
        router.replace("/penjualan"); // Redirect ke halaman utama penjualan
        return;
      }

      const { id: _, products, ...formData } = data;

      setForm(formData);
      setProductList(data.products);
      const totals = calculateTotal(data.products);
      setSubTotal(totals.subTotal);
      setPpn(totals.ppn);
      setTotal(totals.total);

      setTitle(`Detail - ${formData.quoteNumber}`);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products"); // Call the API route
      if (response.ok) {
        const data = await response.json();
        setAvailableProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData(parseInt(id));
    fetchProducts();
  }, [id]);
  return (
    <div className="p-4">
      <Card className="p-4">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="customer">Customer</Label>
              <Select
                required
                value={form.customer}
                onValueChange={(value) =>
                  setForm((prevForm) => ({ ...prevForm, customer: value }))
                }
                disabled
              >
                <SelectTrigger id="customer">
                  <SelectValue placeholder="Pilih customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer1">Customer 1</SelectItem>
                  <SelectItem value="customer2">Customer 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quoteNumber">Penawaran Harga No.</Label>
              <Input
                id="quoteNumber"
                placeholder="Masukkan nomor penawaran harga"
                required
                value={form.quoteNumber}
                onChange={handleFormChange}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="date">Tanggal</Label>
              <Input
                id="date"
                placeholder="Masukkan tanggal"
                type="date"
                required
                value={formatDate(form.date)}
                onChange={handleFormChange}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="customerReference">Referensi Customer:</Label>
              <Input
                id="customerReference"
                placeholder="Masukkan referensi customer"
                required
                value={form.customerReference}
                onChange={handleFormChange}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="termOfPayment">Term of Payment</Label>
              <Select
                required
                value={form.termOfPayment}
                onValueChange={(value) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    termOfPayment: value,
                  }))
                }
                disabled
              >
                <SelectTrigger id="termOfPayment">
                  <SelectValue placeholder="Pilih term of payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Masukkan subjek"
                value={form.subject}
                onChange={handleFormChange}
                disabled
              />
            </div>
          </div>

          <div className="mt-4">
            <Label>Produk</Label>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 mt-2">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-2">Produk</th>
                    <th className="border border-gray-300 p-2">Deskripsi</th>
                    <th className="border border-gray-300 p-2">Qty</th>
                    <th className="border border-gray-300 p-2">Satuan</th>
                    <th className="border border-gray-300 p-2">Harga</th>
                    <th className="border border-gray-300 p-2">Total</th>
                    {/* <th className="border border-gray-300 p-2"></th> */}
                  </tr>
                </thead>
                <tbody>
                  {productList.map((product, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        <Select value={product.productId.toString()} disabled>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih produk" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableProducts.map((product) => (
                              <SelectItem
                                key={product.id}
                                value={product.id.toString()}
                              >
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>

                      {/* Deskripsi Produk */}
                      <td className="border border-gray-300 p-2">
                        <Input
                          placeholder="Deskripsi produk"
                          value={product.description || ""}
                          onChange={(e) =>
                            handleChange(index, "deskripsi", e.target.value)
                          }
                          disabled
                        />
                      </td>

                      {/* Qty */}
                      <td className="border border-gray-300 p-2">
                        <Input
                          placeholder="Qty"
                          type="number"
                          value={product.quantity}
                          onChange={(e) =>
                            handleChange(index, "qty", e.target.value)
                          }
                          disabled
                        />
                      </td>

                      <td className="border border-gray-300 p-2">
                        <Select value={product.unit || ""} disabled>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih satuan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pcs">Pcs</SelectItem>
                            <SelectItem value="set">Set</SelectItem>
                          </SelectContent>
                        </Select>
                        {/* <span>{product.unit}</span> */}
                      </td>

                      {/* Harga */}
                      <td className="border border-gray-300 p-2">
                        <Input
                          placeholder="Harga"
                          type="number"
                          value={product.price}
                          onChange={(e) =>
                            handleChange(index, "harga", e.target.value)
                          }
                          disabled
                        />
                      </td>

                      {/* Total */}
                      <td className="border border-gray-300 p-2">
                        {product.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4 flex justify-between gap-20">
            <div className="">
              <Label htmlFor="notes">Notes:</Label>
              <Textarea
                id="notes"
                placeholder="Tambahkan catatan"
                value={form.notes}
                onChange={handleFormChange}
                disabled
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              {/* <div className="flex"> */}
              <h1 className="font-semibold">Sub-total</h1>
              <h1>{subTotal}</h1>
              {/* </div> */}
              {/* <div className="flex"> */}
              <h1 className="font-semibold">PPN 11%</h1>
              <h1>{ppn}</h1>
              {/* </div> */}
              {/* <div className="flex"> */}
              <h1 className="font-semibold">TOTAL</h1>
              <h1>{total}</h1>
              {/* </div> */}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div className="flex gap-2">
            <div className="flex justify-end mb-10">
              <Link href={`/penawaran-harga`}>
                <Button>Kembali</Button>
              </Link>
            </div>
            <div className="flex justify-end mb-10">
              <Link href={`/penawaran-harga/${id}/edit`}>
                <Button>Edit Invoice</Button>
              </Link>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Label>Upload Faktur Pajak Tanggal:</Label>
            {/* <Input type="date" /> */}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
