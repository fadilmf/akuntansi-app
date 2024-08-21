import type { Metadata } from "next";
import { Fira_Sans, Inter } from "next/font/google";
import "@/styles/globals.css";
import Sidebar from "@/components/navigation/Sidebar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PageTitleProvider } from "@/contexts/PageTitleContext";
import AppLayout from "@/components/AppLayout";

const inter = Inter({ subsets: ["latin"] });
const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "800"],
});

export const metadata: Metadata = {
  title: "Abimantara",
  description: "Akuntansi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
