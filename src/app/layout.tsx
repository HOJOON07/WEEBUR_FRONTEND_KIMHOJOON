import type { Metadata } from "next";

import "@/app/globals.css";
import { QueryProvider } from "@/store/query-provider";

export const metadata: Metadata = {
  title: "HoJoon WeeBur FrontEnd AssignMent",
  description: "HoJoon WeeBur FrontEnd AssignMent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        <body>{children}</body>
      </QueryProvider>
    </html>
  );
}
