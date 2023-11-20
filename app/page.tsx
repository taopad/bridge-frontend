import { BuyForm } from "@/components/BuyForm";
import { SellForm } from "@/components/SellForm";
import { ApproveForm } from "@/components/ApproveForm";
import { PendingRewards } from "@/components/PendingRewards";
import { DistributeForm } from "@/components/DistributeForm";
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol";
import { NativeTokenSymbol } from "@/components/NativeTokenSymbol";
import { NativeTokenBalance } from "@/components/NativeTokenBalance";
import { WalletConnectButton } from "@/components/WalletConnectButton";

export default function Home() {
    return (
        <main className="flex flex-col gap-4 container mx-auto">
            <div>
                <WalletConnectButton />
            </div>
            <div>
                <a
                    href="https://faucet.buildbear.io/thundering-jek-tono-porkins-d5eff8e7"
                    rel="noreffer"
                    target="_blank"
                    className="text-blue-500"
                >
                    Faucet
                </a>
            </div >
            <div>
                Your balance: <NativeTokenBalance /> $<NativeTokenSymbol />
            </div>
            <div>
                Your rewards: <PendingRewards /> $<RewardTokenSymbol />
            </div>
            <div>
                <BuyForm />
            </div>
            <div>
                <SellForm />
            </div>
            <div>
                <ApproveForm />
            </div>
            <div>
                <DistributeForm />
            </div>
        </main >
    )
}
