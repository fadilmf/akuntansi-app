"use client";

import { Card } from "@/components/ui/card";
import { usePageTitle } from "@/contexts/PageTitleContext";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { setTitle } = usePageTitle();
  useEffect(() => {
    setTitle("Home");
  }, [setTitle]);
  return (
    <div className="p-4">
      <Card className="p-4 h-screen">
        <h1>Home Page</h1>
      </Card>
      <Card className="p-4">
        <h1>Home Page</h1>
      </Card>
      <Card className="p-4">
        <h1>Home Page</h1>
      </Card>
      <Card className="p-4">
        <h1>Home Page</h1>
      </Card>
      <Card className="p-4">
        <h1>Home Page</h1>
      </Card>
      <Card className="p-4">
        <h1>Home Page</h1>
      </Card>
      <Card className="p-4">
        <h1>Home Page</h1>
      </Card>
      <Card className="p-4">
        <h1>Home Page</h1>
      </Card>
      <Card className="p-4">
        <h1>Home Page</h1>
      </Card>
      <Card className="p-4">
        <h1>Home Page</h1>
      </Card>
    </div>
  );
}
