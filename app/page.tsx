import { BuyForm } from "@/components/BuyForm";
import { SellForm } from "@/components/SellForm";
import { ClaimForm } from "@/components/ClaimForm";
import { ApproveForm } from "@/components/ApproveForm";
import { RewardBalance } from "@/components/RewardBalance";
import { PendingRewards } from "@/components/PendingRewards";
import { DistributeForm } from "@/components/DistributeForm";
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol";
import { NativeTokenSymbol } from "@/components/NativeTokenSymbol";
import { NativeTokenBalance } from "@/components/NativeTokenBalance";
import { WalletConnectButton } from "@/components/WalletConnectButton";

export default function Home() {
    return (
        <main className="flex flex-col gap-4 container mx-auto">
            <WalletConnectButton />
            <hr />
            <a
                href="https://faucet.buildbear.io/sour-bib-fortuna-15b6b730"
                rel="noreffer"
                target="_blank"
                className="text-blue-500"
            >
                Faucet
            </a>
            <hr />
            <div>
                Your balance: <NativeTokenBalance /> $<NativeTokenSymbol />
            </div>
            <hr />
            <div>
                Your pending rewards: <PendingRewards /> $<RewardTokenSymbol />
            </div>
            <ClaimForm />
            <hr />
            <div>
                Taxes to distribute: <RewardBalance /> $<NativeTokenSymbol />
            </div>
            <DistributeForm />
            <hr />
            <BuyForm />
            <SellForm />
            <ApproveForm />
        </main>
    )
}
