"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FormulirPenjualanPage() {
  const { setTitle } = usePageTitle();

  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [productList, setProductList] = useState([
    { id: 1, produk: "", deskripsi: "", qty: 1, satuan: "", harga: 0 },
  ]);
  const [form, setForm] = useState({
    invoiceNumber: "",
    date: "",
    salesOrderNumber: "",
    deliveryNumber: "",
    customer: "",
    poNumber: "",
    termOfPayment: "",
    subject: "",
    notes: "",
    amount: 0,
  });

  const [subTotal, setSubTotal] = useState(0);
  const [ppn, setPpn] = useState(0);
  const [total, setTotal] = useState(0);

  const addProduk = () => {
    setProductList([
      ...productList,
      {
        id: productList.length + 1,
        produk: "",
        deskripsi: "",
        qty: 1,
        satuan: "",
        harga: 0,
      },
    ]);
  };

  const removeProduk = (index: number) => {
    if (productList.length > 1) {
      setProductList(productList.filter((_, i) => i !== index));
    }
  };

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

  const calculateTotal = () => {
    const subTotalValue = productList.reduce(
      (acc, product) => acc + product.qty * product.harga,
      0
    );
    const ppnValue = subTotalValue * 0.11; // 11% dari sub-total
    const totalValue = subTotalValue + ppnValue;

    setSubTotal(subTotalValue);
    setPpn(ppnValue);
    setTotal(totalValue);

    // Set nilai total ke dalam form untuk di POST ke API
    setForm((prevForm) => ({ ...prevForm, amount: totalValue }));
  };

  const fetchData = async (id: number) => {
    // Fetch data berdasarkan ID untuk prefill form saat mode edit
    try {
      setIsLoading(true);
      const response = await fetch(`/api/sales/${id}`);
      const data = await response.json();

      if (!response.ok) {
        // Jika ID tidak ditemukan, tampilkan pesan error
        alert("Data tidak ditemukan.");
        router.replace("/penjualan"); // Redirect ke halaman utama penjualan
        return;
      }

      const { id: _, ...formData } = data;

      setForm(formData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const method = isEditMode ? "PUT" : "POST";
      const endpoint = isEditMode ? `/api/sales/${id}` : "/api/sales";

      console.log("ini data yang dikirim ", form);

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          // productList,
        }),
      });

      if (response.ok) {
        // Redirect or show success message
        router.replace("/penjualan");
      } else {
        // Handle error
        const errorData = await response.json();
        alert(`Gagal menyimpan data: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchData(parseInt(id));
    }
    setTitle("Faktur Penjualan - Formulir");
    calculateTotal();
    console.log("pathname = ", id);
  }, [setTitle]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="p-4">
        <Card className="p-4">
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="invoiceNumber">Invoice No</Label>
                <Input
                  id="invoiceNumber"
                  placeholder="Masukkan nomor invoice"
                  required
                  value={form.invoiceNumber}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <Label htmlFor="date">Tanggal</Label>
                <Input
                  id="date"
                  placeholder="Masukkan tanggal"
                  type="date"
                  required
                  value={form.date}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <Label htmlFor="salesOrderNumber">Sales Order No.</Label>
                <Input
                  id="salesOrderNumber"
                  placeholder="Masukkan nomor sales order"
                  required
                  value={form.salesOrderNumber}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <Label htmlFor="deliveryNumber">Pengiriman No.</Label>
                <Input
                  id="deliveryNumber"
                  placeholder="Masukkan nomor pengiriman"
                  required
                  value={form.deliveryNumber}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <Label htmlFor="customer">Customer</Label>
                <Select
                  required
                  value={form.customer}
                  onValueChange={(value) =>
                    setForm((prevForm) => ({ ...prevForm, customer: value }))
                  }
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
                <Label htmlFor="poNumber">PO. No.</Label>
                <Input
                  id="poNumber"
                  placeholder="Masukkan nomor PO"
                  required
                  value={form.poNumber}
                  onChange={handleFormChange}
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
                <Label htmlFor="invoice">Invoice diterima:</Label>
                <Input id="invoice" placeholder="Invoice" />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-4">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Masukkan subjek"
                  value={form.subject}
                  onChange={handleFormChange}
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
                      <th className="border border-gray-300 p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((produk, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-2">
                          <Select
                            onValueChange={(value) =>
                              handleChange(index, "produk", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih produk" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="produk1">Produk 1</SelectItem>
                              <SelectItem value="produk2">Produk 2</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="border border-gray-300 p-2">
                          <Input
                            placeholder="Deskripsi produk"
                            value={produk.deskripsi}
                            onChange={(e) =>
                              handleChange(index, "deskripsi", e.target.value)
                            }
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <Input
                            placeholder="Qty"
                            type="number"
                            value={produk.qty}
                            onChange={(e) =>
                              handleChange(index, "qty", e.target.value)
                            }
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <Select
                            onValueChange={(value) =>
                              handleChange(index, "satuan", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih satuan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pcs">Pcs</SelectItem>
                              <SelectItem value="set">Set</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="border border-gray-300 p-2">
                          <Input
                            placeholder="Harga"
                            type="number"
                            value={produk.harga}
                            onChange={(e) =>
                              handleChange(index, "harga", e.target.value)
                            }
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          {produk.qty * produk.harga}
                        </td>
                        <td className="border border-gray-300 p-2">
                          <Button
                            variant="destructive"
                            onClick={() => removeProduk(index)}
                            disabled={productList.length === 1}
                          >
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button variant="link" className="mt-2" onClick={addProduk}>
                + tambah produk
              </Button>
            </div>
            <div className="mt-4 flex justify-between gap-20">
              <div className="">
                <Label htmlFor="notes">Notes:</Label>
                <Textarea
                  id="notes"
                  placeholder="Tambahkan catatan"
                  value={form.notes}
                  onChange={handleFormChange}
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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-yellow-300 hover:bg-yellow-400 text-black">
                    Cancel
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Apakah kamu mau membatalkan formulir ini?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Data formulir yang sudah diisi akan hilang.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Tidak</AlertDialogCancel>
                    <AlertDialogAction onClick={() => router.back()}>
                      Ya
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button
                className="bg-blue-500 hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Save
              </Button>
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
}
