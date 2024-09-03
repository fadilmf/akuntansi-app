export type Product = {
  id: number;
  name: string;
  category?: string | null;
  unit?: string | null;
  stock?: number | null;
  status?: string | null;
  salesList: SalesProduct[];
};

export type Sales = {
  id: number;
  invoiceNumber: string;
  salesOrderNumber: string;
  deliveryNumber: string;
  poNumber: string;
  date: Date;
  customer: string;
  termOfPayment: string;
  subject: string;
  notes?: string | null;
  amount?: number | null;
  bill?: number | null;
  status?: string | null;
  productList: SalesProduct[];
};

export type SalesProduct = {
  id?: number;
  salesId?: number;
  productId: number;
  description?: string | null;
  quantity: number;
  unit?: string | null;
  price: number;
  total: number;
  product: Product;
  sales: Sales;
};
