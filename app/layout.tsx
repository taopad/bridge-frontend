import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { Navbar } from "@/components/Navbar"
import { WalletProvider } from "@/components/WalletProvider"
import { TargetChainProvider } from "@/components/TargetChainProvider"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Taobridge",
    description: "Taobridge (built by taopad.io)",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} dark`}>
                <WalletProvider>
                    <TargetChainProvider>
                        <Navbar />
                        <div className="max-w-[1024px] mx-auto mb-6 px-2">
                            {children}
                        </div>
                        <div className="my-4 text-center">
                            <p>
                                Built by{" "}
                                <Link href="https://taopad.io" target="_blank">
                                    TaoPad
                                </Link>.
                            </p>
                            <p>
                                Powered by{" "}
                                <Link href="https://layerzero.network/" target="_blank">
                                    LayerZero
                                </Link>.
                            </p>
                        </div>
                    </TargetChainProvider>
                </WalletProvider>
            </body>
        </html>
    )
}
