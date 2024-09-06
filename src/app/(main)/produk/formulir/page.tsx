"use client";

import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePageTitle } from "@/contexts/PageTitleContext";
import { Product } from "@/types/types";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useEffect, useState } from "react";

export default function FormulirProdukPage() {
  const { setTitle } = usePageTitle();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    category: "",
    unit: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
        }),
      });

      if (response.ok) {
        router.replace("/produk");
      } else {
        const errorData = await response.json();
        alert(`Failed to save data: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    setTitle("Produk - Formulir");
  }, [setTitle]);

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
                onChange={handleFormChange}
              />
            </div>
            <div>
              <Label htmlFor="category">Kategori</Label>
              <Input
                id="category"
                placeholder="Masukkan kategori"
                required
                value={form.category}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <Label htmlFor="unit">Satuan</Label>
              <Input
                id="unit"
                placeholder="Masukkan satuan"
                required
                value={form.unit}
                onChange={handleFormChange}
              />
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
        </CardFooter>
      </Card>
    </div>
  );
}
