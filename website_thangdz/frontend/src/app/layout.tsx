// frontend/src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "Lê Minh Thắng | Thương hiệu & Giải pháp Lập trình",
  description: "Website cá nhân thương hiệu của ThangDz, chuyên cung cấp các giải pháp lập trình Next.js, FastAPI, viết blog tin tức công nghệ và chia sẻ tài liệu học tập lập trình.",
  keywords: ["Next.js", "FastAPI", "Lap trinh", "Web ca nhan", "VietQR", "Thanh toan", "Blog lap trinh", "Mentoring"],
  authors: [{ name: "Le Minh Thang" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-28 pb-16">
          {children}
        </main>
        <ChatBot />
        <Footer />
      </body>
    </html>
  );
}
