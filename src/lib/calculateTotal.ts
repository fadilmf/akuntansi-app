import { SalesProduct } from "@/types/types";

export function calculateTotal(productList: SalesProduct[]) {
  const subTotalValue = productList.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );
  const ppnValue = subTotalValue * 0.11; // 11% dari sub-total
  const totalValue = subTotalValue + ppnValue;

  return {
    subTotal: subTotalValue,
    ppn: ppnValue,
    total: totalValue,
  };
}
