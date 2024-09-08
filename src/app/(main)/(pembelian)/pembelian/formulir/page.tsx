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
import { calculateTotal } from "@/lib/calculateTotal";
import { Product, SalesProduct } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FormulirPembelianPage() {
  const { setTitle } = usePageTitle();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [productList, setProductList] = useState<SalesProduct[]>([
    {
      id: 0,
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

      const response = await fetch("/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          date: new Date(form.date), // Ensure date format is correct
          amount: total,
          productList: productList, // This will be updated in the next request
        }),
      });

      if (response.ok) {
        // const saleData = await response.json();
        // const salesId = saleData.id;

        // const cleanedProductList = productList.map(
        //   ({ product, sales, id, ...rest }) => ({
        //     ...rest,
        //     salesId: salesId, // Add salesId if needed
        //   })
        // );

        // const productResponse = await fetch("/api/sales-products", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     products: cleanedProductList,
        //   }),
        // });

        // if (productResponse.ok) {
        //   // Redirect or show success message
        //   router.replace("/penjualan");
        // } else {
        //   const errorData = await productResponse.json();
        //   alert(
        //     `Failed to save products: ${errorData.error || "Unknown error"}`
        //   );
        // }
        router.replace("/penjualan");
      } else {
        const errorData = await response.json();
        alert(`Failed to save data: ${errorData.error || "Unknown error"}`);
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

  useEffect(() => {
    setIsLoading(true);
    setTitle("Faktur Pembelian - Formulir");
    fetchProducts();
    calculateTotal(productList);
    setIsLoading(false);
  }, [setTitle, productList]);

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
                    {productList.map((product, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-2">
                          <Select
                            onValueChange={(value) => {
                              const selectedProductId = parseInt(value, 10); // Pastikan value di-convert ke number
                              const selectedProduct = availableProducts.find(
                                (p) => p.id === selectedProductId
                              );
                              if (selectedProduct) {
                                handleChange(
                                  index,
                                  "productId",
                                  selectedProduct.id
                                );
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih produk" />
                            </SelectTrigger>
                            <SelectContent>
                              {getAvailableProductsForSelect(index).map(
                                (product) => (
                                  <SelectItem
                                    key={product.id}
                                    value={product.id.toString()}
                                  >
                                    {product.name}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="border border-gray-300 p-2">
                          <Input
                            placeholder="Deskripsi produk"
                            value={product.description || ""}
                            onChange={(e) =>
                              handleChange(index, "description", e.target.value)
                            }
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <Input
                            placeholder="Qty"
                            type="number"
                            value={product.quantity}
                            onChange={(e) =>
                              handleChange(index, "quantity", e.target.value)
                            }
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <Select
                            onValueChange={(value) =>
                              handleChange(index, "unit", value)
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
                            value={product.price}
                            onChange={(e) =>
                              handleChange(index, "price", e.target.value)
                            }
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          {product.quantity * product.price}
                        </td>
                        <td className="border border-gray-300 p-2">
                          <Button
                            variant="destructive"
                            onClick={() => removeProduct(index)}
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
              <Button variant="link" className="mt-2" onClick={addProduct}>
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
