import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { WalletProvider } from "@/components/WalletProvider";
import { NativeTokenSymbol } from "@/components/NativeTokenSymbol";

const myFont = localFont({ src: "./RocGroteskWideMedium.otf" })

export const metadata: Metadata = {
    title: 'TaoPad',
    description: 'TaoPad app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`text-white ${myFont.className}`} style={{ backgroundImage: "url('/TaoBG20.jpg')" }}>
                <WalletProvider>
                    <div className="container mx-auto mt-4 px-2">
                        <Navbar />
                    </div>
                    <div className="flex justify-center my-10">
                        <Link href="/swap" target="_blank">Buy $<NativeTokenSymbol /></Link>
                    </div>
                    <div className="max-w-[1024px] mx-auto mb-[120px] px-2">
                        {children}
                    </div>
                </WalletProvider>
            </body>
        </html>
    )
}
