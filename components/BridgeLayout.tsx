import Link from "next/link"
import { Navbar } from "@/components/Navbar"
import { WalletProvider } from "@/components/WalletProvider"
import { TokenConfigProvider } from "@/components/TokenConfigProvider"
import { buttonVariants } from "@/components/ui/button"

type TokenType = "wtao" | "tbank"

export function BridgeLayout({ token, children }: { token: TokenType, children: React.ReactNode }) {
    return (
        <WalletProvider token={token}>
            <TokenConfigProvider token={token}>
                <div className="flex flex-col gap-4">
                    <Navbar />
                    <div className="flex flex-col gap-4 max-w-[1024px] w-full mx-auto px-2">
                        <div className="flex gap-2 justify-between w-full bg-secondary p-2 rounded-lg">
                            <Link
                                href="/wtao"
                                className={`${buttonVariants({ variant: token === "wtao" ? "default" : "secondary" })} flex-1 no-underline`}
                            >
                                $wTao
                            </Link>
                            <Link
                                href="/tbank"
                                className={`${buttonVariants({ variant: token === "tbank" ? "default" : "secondary" })} flex-1 no-underline`}
                            >
                                $TBANK
                            </Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            {children}
                        </div>
                    </div>
                </div>
            </TokenConfigProvider>
        </WalletProvider >
    )
}
