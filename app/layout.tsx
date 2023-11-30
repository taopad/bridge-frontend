import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { WalletProvider } from "@/components/WalletProvider";

const myFont = localFont({ src: "./Fontspring-DEMO-rocgroteskwide-medium.otf" })

export const metadata: Metadata = {
    title: 'TaoPad',
    description: 'TaoPad app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`bg-black text-white ${myFont.className}`}>
                <WalletProvider>
                    <div className="container mx-auto mt-4">
                        <Navbar />
                        {children}
                    </div>
                </WalletProvider>
            </body>
        </html>
    )
}
