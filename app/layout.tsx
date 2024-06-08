import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { PostsProvider } from "@/context/PostsContext";
import { AuthProvider } from '../context/AuthContext';
import  ThemeProvider from "@/context/ThemeContext";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} bg-white dark:bg-gray-800`} >
      <AuthProvider>
        <ThemeProvider attribute="class" >  
          <PostsProvider>
            <Header/>
            {children}
            <Footer/>
          </PostsProvider>
        </ThemeProvider>
      </AuthProvider>
          </body>
    </html>
  );
}
