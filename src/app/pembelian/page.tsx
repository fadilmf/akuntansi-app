import { DataTableDemo } from "@/components/card/DataTable";
import { TableDemo } from "@/components/card/Table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

export default function PembelianPage() {
  return (
    <div className="p-4">
      {/* <div className="bg-white rounded-lg p-4 border"> */}
      <Card className="p-4">
        <div className="flex justify-between">
          <h1 className="">Pembelian</h1>
          <Link href={"/pembelian/tambah-pembelian"}>
            <Button>Tambah Tagihan Pembelian</Button>
          </Link>
        </div>
        <div>
          {/* <TableDemo /> */}
          <DataTableDemo />
        </div>
      </Card>
      {/* </div> */}
    </div>
  );
}
