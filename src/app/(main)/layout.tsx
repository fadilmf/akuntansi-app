import type { Metadata } from "next";
import { Fira_Sans, Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PageTitleProvider } from "@/contexts/PageTitleContext";
import AppLayout from "@/components/AppLayout";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abimantra",
  description: "Aplikasi Akuntansi",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        {/* <body
        className={`${inter.className} flex items-start justify-between bg-slate-50`}
      > */}
        <body
          className={`${inter.className} flex flex-col lg:flex-row bg-slate-50`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <PageTitleProvider>
              <AppLayout>{children}</AppLayout>
            </PageTitleProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
