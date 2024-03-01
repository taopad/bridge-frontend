import { Navbar } from "@/components/Navbar"
import { WalletProvider } from "@/components/WalletProvider"
import { TokenConfigProvider } from "@/components/TokenConfigProvider"

export function BridgeLayout({ token, children }: { token: "wtao", children: React.ReactNode }) {
    return (
        <WalletProvider token={token}>
            <TokenConfigProvider token={token}>
                <div className="flex flex-col gap-4">
                    <Navbar />
                    <div className="flex flex-col gap-4 max-w-[1024px] w-full mx-auto px-2">
                        {children}
                    </div>
                </div>
            </TokenConfigProvider>
        </WalletProvider>
    )
}
