import { BuyForm } from "@/components/UtilSwap/BuyForm";
import { SellForm } from "@/components/UtilSwap/SellForm";
import { ApproveForm } from "@/components/UtilSwap/ApproveForm";
import Link from "next/link";

const faucet = "https://faucet.buildbear.io/central-finis-valorum-c65fc171"

export default function Swap() {
    return (
        <div className="flex flex-col gap-4">
            <p>This page wont exist in production, buy and sells happen on uniswap</p>
            <div>
                <Link href={faucet} target="_blank">BBETH faucet</Link>
            </div>
            <BuyForm />
            <SellForm />
            <ApproveForm />
        </div>
    )
}
