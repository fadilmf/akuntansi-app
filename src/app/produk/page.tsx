"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePageTitle } from "@/contexts/PageTitleContext";
import { Product } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProdukPage() {
  const { setTitle } = usePageTitle();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products"); // Call the API route
      if (response.ok) {
        const data = await response.json();
        setProducts(data); // Set the fetched products to state
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredData = products.filter((product) => {
    const matchesProduct = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesProduct;
  });

  useEffect(() => {
    setTitle("Produk");
    fetchProducts();
  }, [setTitle]);
  return (
    <>
      <div className="p-4 pb-24 w-full">
        <Card className="p-4 h-full">
          <div className="flex flex-col lg:flex-row justify-between mb-4">
            <div className="flex items-center space-x-4">
              <label className="font-semibold">Pencarian:</label>
              <Input
                placeholder="Semua Produk"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2 w-1/3">
                    Nama Produk
                  </th>
                  <th className="border border-gray-300 p-2 w-1/5">Kategori</th>
                  <th className="border border-gray-300 p-2">Satuan</th>
                  <th className="border border-gray-300 p-2">Stok</th>
                  <th className="border border-gray-300 p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((product, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">
                      {product.name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {product.category}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {product.unit}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {product.stock}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {product.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="fixed bottom-5 ml-4 z-20 ">
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Link href={"/produk/formulir"}>Buat Produk Baru</Link>
        </Button>
      </div>

      <div className="fixed bottom-0 left-0 w-screen p-4 bg-white border-t shadow-md z-10 h-20"></div>
    </>
  );
}
