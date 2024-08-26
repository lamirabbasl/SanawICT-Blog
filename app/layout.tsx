import type { Metadata } from "next";
import ReactQueryProvider from "./_provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "SanawICT",
  description: "Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-noto w-screen h-screen  overflow-x-hidden ">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
