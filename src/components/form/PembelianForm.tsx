"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "./DatePicker";
import { Plus } from "lucide-react";

// Define schema using zod
const formSchema = z.object({
  vendor: z.string().nonempty({ message: "Vendor is required." }),
  nomor: z.string().optional(),
  tanggalTransaksi: z.date().refine((date) => date != null, {
    message: "Tanggal transaksi is required.",
  }),
  tanggalJatuhTempo: z.date().optional(),
  termin: z.string().optional(),
  tag: z.string().optional(),
  produk: z
    .array(
      z.object({
        namaProduk: z
          .string()
          .nonempty({ message: "Nama produk is required." }),
        deskripsi: z.string().optional(),
        kuantitas: z
          .number()
          .min(1, { message: "Kuantitas harus lebih dari 0." }),
        harga: z
          .number()
          .min(0, { message: "Harga harus lebih dari atau sama dengan 0." }),
        jumlah: z.number().optional(),
      })
    )
    .min(1, { message: "Setidaknya satu produk harus ditambahkan." }),
});

export function PembelianForm() {
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendor: "",
      nomor: "",
      tanggalTransaksi: new Date(),
      tanggalJatuhTempo: undefined,
      termin: "",
      tag: "",
      produk: [
        {
          namaProduk: "",
          deskripsi: "",
          kuantitas: 1,
          harga: 0,
          jumlah: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "produk",
  });

  // Define submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-5">
          <div className="w-full">
            {/* Vendor */}
            <FormField
              control={form.control}
              name="vendor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama vendor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            {/* Nomor */}
            <FormField
              control={form.control}
              name="nomor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nomor transaksi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="w-full">
            {/* Tanggal Transaksi */}
            <FormField
              control={form.control}
              name="tanggalTransaksi"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Transaksi</FormLabel>
                  <FormControl>
                    <DatePicker
                      selectedDate={field.value}
                      onDateChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            {/* Tanggal Jatuh Tempo */}
            <FormField
              control={form.control}
              name="tanggalJatuhTempo"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Jatuh Tempo</FormLabel>
                  <FormControl>
                    <DatePicker
                      selectedDate={field.value}
                      onDateChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="w-full">
            {/* Termin */}
            <FormField
              control={form.control}
              name="termin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Termin</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan termin pembayaran"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            {/* Tag */}
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan tag" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Produk */}
        <div className="space-y-4">
          {fields.map((item, index) => (
            <div key={item.id} className="flex gap-4 border p-4 rounded">
              <div className="w-1/5">
                <FormField
                  control={form.control}
                  name={`produk.${index}.namaProduk`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Produk</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama produk" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-2/5">
                <FormField
                  control={form.control}
                  name={`produk.${index}.deskripsi`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Input placeholder="Deskripsi produk" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-1/5">
                <FormField
                  control={form.control}
                  name={`produk.${index}.kuantitas`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kuantitas</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Jumlah" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-1/5">
                <FormField
                  control={form.control}
                  name={`produk.${index}.harga`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harga</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Harga" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-1/5">
                <FormField
                  control={form.control}
                  name={`produk.${index}.jumlah`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Total"
                          readOnly
                          {...field}
                          value={
                            form.watch(`produk.${index}.kuantitas`) *
                            form.watch(`produk.${index}.harga`)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-end">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  Hapus
                </Button>
              </div>
            </div>
          ))}

          <Button
            className="flex gap-2"
            type="button"
            variant={"outline"}
            onClick={() =>
              append({
                namaProduk: "",
                deskripsi: "",
                kuantitas: 1,
                harga: 0,
                jumlah: 0,
              })
            }
          >
            <Plus />
            Tambah Produk
          </Button>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
