// components/ProductTable.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product, SalesProduct } from "@/types/types";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";

interface ProductListFormProps {
  productList: SalesProduct[];
  availableProducts: Product[];
  onAddProduct: () => void;
  onRemoveProduct: (index: number) => void;
  onProductChange: (
    index: number,
    field: keyof Omit<SalesProduct, "product" | "sales">,
    value: any
  ) => void;
}

export const ProductListForm: React.FC<ProductListFormProps> = ({
  productList,
  availableProducts,
  onAddProduct,
  onRemoveProduct,
  onProductChange,
}) => {
  const router = useRouter();

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

  return (
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
                        onProductChange(index, "productId", selectedProduct.id);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih produk" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableProductsForSelect(index).length === 0 ? (
                        <div className="flex flex-col items-center">
                          <p className="text-xs py-2 px-1">
                            Tidak ada produk tersedia
                          </p>
                          <Separator />
                          <Button
                            className="w-full m-1"
                            onClick={() => router.push("/produk/formulir")}
                          >
                            Tambah Produk Baru
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
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
                          <Separator />
                          <Button
                            className="w-full m-1"
                            onClick={() => router.push("/produk/formulir")}
                          >
                            Tambah Produk Baru
                          </Button>
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </td>
                <td className="border border-gray-300 p-2">
                  <Input
                    placeholder="Deskripsi produk"
                    value={product.description || ""}
                    onChange={(e) =>
                      onProductChange(index, "description", e.target.value)
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <Input
                    placeholder="Qty"
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      onProductChange(index, "quantity", e.target.value)
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <Select
                    onValueChange={(value) =>
                      onProductChange(index, "unit", value)
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
                      onProductChange(index, "price", e.target.value)
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  {product.quantity * product.price}
                </td>
                <td className="border border-gray-300 p-2">
                  <Button
                    variant="destructive"
                    onClick={() => onRemoveProduct(index)}
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
      <Button variant="link" className="mt-2" onClick={onAddProduct}>
        + tambah produk
      </Button>
    </div>
  );
};
