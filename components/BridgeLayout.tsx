import { Navbar } from "@/components/Navbar"
import { TokenAddresses } from "@/components/TokenAddresses"
import { WalletProvider } from "@/components/WalletProvider"
import { TokenConfigProvider } from "@/components/TokenConfigProvider"
import { BridgeCard } from "@/components/BridgeCard/BridgeCard"
import { NetworkCard } from "@/components/NetworkCard/NetworkCard"

export function BridgeLayout({ token }: { token: "wtao" }) {
    return (
        <WalletProvider token={token}>
            <TokenConfigProvider token={token}>
                <div className="flex flex-col gap-4">
                    <Navbar />
                    <div className="flex flex-col gap-4 max-w-[1024px] w-full mx-auto px-2">
                        <NetworkCard />
                        <BridgeCard />
                        <TokenAddresses />
                    </div>
                </div>
            </TokenConfigProvider>
        </WalletProvider>
    )
}
