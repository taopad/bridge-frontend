import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { WalletProvider } from "@/components/WalletProvider";
import { NativeTokenSymbol } from "@/components/NativeTokenSymbol";
import { NativeTokenContract } from "@/config/contracts";

const myFont = localFont({ src: "./RocGroteskWideMedium.otf" })

export const metadata: Metadata = {
    title: 'TaoPad',
    description: 'TaoPad app',
}

const buyLink = `https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${NativeTokenContract.address}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`text-white ${myFont.className}`} style={{ backgroundImage: "url('/TaoBG20.jpg')" }}>
                <WalletProvider>
                    <div className="container mx-auto mt-4 px-2">
                        <Navbar />
                    </div>
                    <div className="relative w-48 h-48 mx-auto">
                        <Image src="/Tao3D.png" alt="Taopad" fill sizes="1" style={{ objectFit: "cover" }} />
                    </div>
                    <div className="flex justify-center my-10">
                        <Link href={buyLink} target="_blank">Buy <NativeTokenSymbol /></Link>
                    </div>
                    <div className="max-w-[1024px] mx-auto mb-[120px] px-2">
                        {children}
                    </div>
                </WalletProvider>
            </body>
        </html>
    )
}
