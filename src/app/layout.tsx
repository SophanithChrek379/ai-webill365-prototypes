import type { Metadata, Viewport } from "next";
import { Inter, Kantumruy_Pro, Noto_Sans_KR } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.scss";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const kantumruyPro = Kantumruy_Pro({
  variable: "--font-kantumruy-pro",
  subsets: ["latin", "khmer"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI WeBill365 Publishing",
  description:
    "Next.js application with Bootstrap 5.3.3 and React Bootstrap components",
  keywords: ["Next.js", "React", "Bootstrap", "TypeScript"],
  authors: [{ name: "AI WeBill365 Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${kantumruyPro.variable} ${notoSansKR.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
