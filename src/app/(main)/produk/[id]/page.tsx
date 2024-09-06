"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePageTitle } from "@/contexts/PageTitleContext";
import { Product } from "@/types/types";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailProdukPage() {
  const { setTitle } = usePageTitle();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<Product>({
    id: 0,
    name: "",
    category: "",
    status: "",
    stock: 0,
    unit: "",
    salesList: [],
  });

  const router = useRouter();
  const params = useParams();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const fetchData = async (id: number) => {
    // Fetch data berdasarkan ID untuk prefill form saat mode edit
    try {
      setIsLoading(true);
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();

      if (!response.ok) {
        // Jika ID tidak ditemukan, tampilkan pesan error
        alert("Data tidak ditemukan.");
        router.replace("/produk"); // Redirect ke halaman utama penjualan
        return;
      }

      setForm(data);
      console.log("ini data produk ", data);
      console.log("ini nilai form", form);

      setTitle(`Produk - ${data.name}`);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(parseInt(id));
    // fetchProducts();
  }, [id]);

  return (
    <div className="p-4">
      <Card className="p-4">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="name">Nama Produk</Label>
              <Input
                id="name"
                placeholder="Masukkan nama produk"
                required
                value={form.name}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="category">Kategori</Label>
              <Input
                id="category"
                placeholder="Masukkan kategori"
                required
                value={form.category!!}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="unit">Satuan</Label>
              <Input
                id="unit"
                placeholder="Masukkan satuan"
                required
                value={form.unit!!}
                disabled
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div className="flex gap-2">
            <div className="flex justify-end mb-10">
              <Link href={`/produk/${id}/edit`}>
                <Button>Edit Invoice</Button>
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
