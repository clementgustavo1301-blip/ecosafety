import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ecosafety — Consultoria Técnica Integrada",
  description: "Consultoria técnica integrada: ambiental, SST, medicina ocupacional e engenharia em uma só gestão técnica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${openSans.variable} ${poppins.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans antialiased text-slate-900 bg-slate-50 selection:bg-ecosafety-500 selection:text-white overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
