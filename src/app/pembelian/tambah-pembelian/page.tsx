import { PembelianForm } from "@/components/form/PembelianForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function TambahPembelianPage() {
  return (
    <div className="p-4">
      <Card className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mt-4">Tambah Tagihan Pembelian</h1>
          <Button>Kembali</Button>
        </div>

        {/* <div className="grid w-full max-w-sm items-center gap-1.5 mt-10">
          <Label htmlFor="vendor">Vendor</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div> */}

        <div className="mt-10">
          <PembelianForm />
        </div>
      </Card>
    </div>
  );
}
