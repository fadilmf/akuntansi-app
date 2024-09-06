"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePageTitle } from "@/contexts/PageTitleContext";
import { useEffect } from "react";
import {
  asset_data,
  cost_of_sales_data,
  equity_data,
  expense_data,
  income_data,
  liability_data,
  other_expense_data,
  other_income_data,
} from "./data-coa";
import TableCOA from "@/components/data-master/TableCOA";

export default function ChartOfAccountPage() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Chart of Account");
  }, [setTitle]);
  return (
    <div className="p-4">
      <Card className="p-4">
        <Tabs defaultValue="asset" className="w-full">
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 h-full">
            <TabsTrigger value="asset">Asset</TabsTrigger>
            <TabsTrigger value="liability">Liability</TabsTrigger>
            <TabsTrigger value="equity">Equity</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="cost-of-sales">Cost of Sales</TabsTrigger>
            <TabsTrigger value="expense">Expense</TabsTrigger>
            <TabsTrigger value="other-income">Other Income</TabsTrigger>
            <TabsTrigger value="other-expense">Other Expense</TabsTrigger>
          </TabsList>

          <TabsContent value="asset">
            <TableCOA data={asset_data} />
          </TabsContent>

          <TabsContent value="liability">
            <TableCOA data={liability_data} />
          </TabsContent>

          <TabsContent value="equity">
            <TableCOA data={equity_data} />
          </TabsContent>

          <TabsContent value="income">
            <TableCOA data={income_data} />
          </TabsContent>

          <TabsContent value="cost-of-sales">
            <TableCOA data={cost_of_sales_data} />
          </TabsContent>

          <TabsContent value="expense">
            <TableCOA data={expense_data} />
          </TabsContent>

          <TabsContent value="other-income">
            <TableCOA data={other_income_data} />
          </TabsContent>

          <TabsContent value="other-expense">
            <TableCOA data={other_expense_data} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
