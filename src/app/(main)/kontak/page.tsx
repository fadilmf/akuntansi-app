"use client";

import { TambahKontakForm } from "@/components/form/TambahKontakForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePageTitle } from "@/contexts/PageTitleContext";
import React, { useEffect } from "react";

export default function KontakPage() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Kontak");
  }, [setTitle]);
  return (
    <div className="p-4">
      <Card className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Kontak</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Tambah Kontak</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Kontak</DialogTitle>
              </DialogHeader>
              <TambahKontakForm />
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
}
