import { BuyForm } from "@/components/UtilSwap/BuyForm";
import { SellForm } from "@/components/UtilSwap/SellForm";
import { ApproveForm } from "@/components/UtilSwap/ApproveForm";
import Link from "next/link";

const faucet = "https://faucet.buildbear.io/annual-ben-quadinaros-8342b10b"

export default function Swap() {
    return (
        <div className="flex flex-col gap-4">
            <p>This page wont exist in production, buys and sells will happen on uniswap only.</p>
            <p>0.01 BBETH max buy.</p>
            <p>Must approve before selling.</p>
            <div>
                <Link href={faucet} target="_blank">BBETH faucet</Link>
            </div>
            <BuyForm />
            <SellForm />
            <ApproveForm />
        </div>
    )
}
