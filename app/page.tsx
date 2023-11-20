import { PendingRewards } from "@/components/PendingRewards";
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol";
import { NativeTokenSymbol } from "@/components/NativeTokenSymbol";
import { NativeTokenBalance } from "@/components/NativeTokenBalance";
import { WalletConnectButton } from "@/components/WalletConnectButton";

export default function Home() {
    return (
        <main>
            <div>
                <WalletConnectButton />
            </div>
            <div>
                Your balance: <NativeTokenBalance /> $<NativeTokenSymbol />
            </div>
            <div>
                Your rewards: <PendingRewards /> $<RewardTokenSymbol />
            </div>
        </main>
    )
}
