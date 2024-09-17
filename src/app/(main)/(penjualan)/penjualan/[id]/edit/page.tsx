"use client";

import { ProductListForm } from "@/components/ProductListForm";
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
import { calculateTotal } from "@/lib/calculateTotal";
import { Product, SalesProduct } from "@/types/types";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditInvoicePage() {
  const { setTitle } = usePageTitle();

  const router = useRouter();
  const params = useParams();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [isLoading, setIsLoading] = useState(false);

  const [productList, setProductList] = useState<SalesProduct[]>([]);

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

  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);

  const [subTotal, setSubTotal] = useState(0);
  const [ppn, setPpn] = useState(0);
  const [total, setTotal] = useState(0);

  const getAvailableProductsForSelect = (currentIndex: number) => {
    const selectedProductIds = new Set(
      productList
        .map((product, index) => index !== currentIndex && product.productId)
        .filter(Boolean)
    );

    return availableProducts.filter(
      (product) => !selectedProductIds.has(product.id)
    );
  };

  const addProduct = () => {
    setProductList([
      ...productList,
      {
        id: productList.length + 1,
        salesId: 0,
        productId: 0,
        description: "",
        quantity: 1,
        unit: "",
        price: 0,
        total: 0,
        product: {
          id: 0,
          name: "",
          salesList: [],
        },
        sales: {
          id: 0,
          invoiceNumber: "",
          salesOrderNumber: "",
          deliveryNumber: "",
          poNumber: "",
          date: new Date(),
          customer: "",
          termOfPayment: "",
          subject: "",
          notes: null,
          amount: null,
          bill: null,
          status: null,
          productList: [],
        },
      },
    ]);
  };

  const removeProduct = (index: number) => {
    if (productList.length > 1) {
      setProductList(productList.filter((_, i) => i !== index));
    }
  };

  const handleChange = (
    index: number,
    field: keyof Omit<SalesProduct, "product" | "sales">,
    value: any
  ) => {
    const newList = [...productList];
    if (field === "price" || field === "quantity") {
      value = parseInt(value, 10); // Convert to integer
    }
    newList[index] = { ...newList[index], [field]: value };
    newList[index].total = newList[index].quantity * newList[index].price;
    setProductList(newList);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const totals = calculateTotal(productList);
      setSubTotal(totals.subTotal);
      setPpn(totals.ppn);
      setTotal(totals.total);
      const isoDate = new Date(form.date);

      console.log("ini prdouk list dari edit ", productList);

      const response = await fetch(`/api/sales/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          date: isoDate,
          productList: productList,
        }),
      });

      if (response.ok) {
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

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products"); // Call the API route
      if (response.ok) {
        const data = await response.json();
        setAvailableProducts(data); // Set the fetched products to state
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
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

      const { id: _, products, ...formData } = data;

      setForm(formData);
      setProductList(data.products);

      const totals = calculateTotal(data.products);
      setSubTotal(totals.subTotal);
      setPpn(totals.ppn);
      setTotal(totals.total);

      setTitle(`Edit - ${formData.invoiceNumber}`);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(parseInt(id));
    fetchProducts();

    setIsLoading(false);
  }, [setTitle]);

  useEffect(() => {
    const totals = calculateTotal(productList);
    setSubTotal(totals.subTotal);
    setPpn(totals.ppn);
    setTotal(totals.total);
  }, [productList]);

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
                  value={formatDate(form.date)}
                  //   value={form.date}
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

            <ProductListForm
              productList={productList}
              availableProducts={availableProducts}
              onAddProduct={addProduct}
              onRemoveProduct={removeProduct}
              onProductChange={handleChange}
            />

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
