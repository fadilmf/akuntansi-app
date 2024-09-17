"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePageTitle } from "@/contexts/PageTitleContext";
import { Edit, Trash, UserPlus, Search, EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { useCurrentRole } from "@/hooks/use-current-role";

export default function UserManagementPage() {
  const { setTitle } = usePageTitle();
  const role = useCurrentRole();

  useEffect(() => {
    setTitle("Pengaturan");
  }, [setTitle]);

  return (
    <div className="p-4">
      <Card className="p-4">
        <div className="flex justify-between items-center">
          Pengaturan
          {role === "ADMIN" && (
            <Button asChild>
              <Link href={"/pengaturan/admin"}>Admin</Link>
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
