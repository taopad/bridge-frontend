import type { Metadata } from "next"
import Link from "next/link"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Taobridge",
    description: "Taobridge (built by taopad.io)",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} dark`}>
                <div className="flex flex-col gap-4">
                    {children}
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
                </div>
            </body>
        </html>
    )
}
