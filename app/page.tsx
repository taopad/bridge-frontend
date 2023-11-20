import { PendingRewards } from "@/components/PendingRewards";
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol";
import { NativeTokenSymbol } from "@/components/NativeTokenSymbol";
import { NativeTokenBalance } from "@/components/NativeTokenBalance";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { BuyForm } from "@/components/BuyForm";

export default function Home() {
    return (
        <main className="flex flex-col gap-4">
            <div>
                <WalletConnectButton />
            </div>
            <div>
                <a
                    href="https://faucet.buildbear.io/enchanting-luke-skywalker-8ba898cc"
                    rel="noreffer"
                    target="_blank"
                    className="text-blue-500"
                >
                    Faucet
                </a>
            </div>
            <div>
                Your balance: <NativeTokenBalance /> $<NativeTokenSymbol />
            </div>
            <div>
                Your rewards: <PendingRewards /> $<RewardTokenSymbol />
            </div>
            <div>
                <BuyForm />
            </div>
        </main>
    )
}
