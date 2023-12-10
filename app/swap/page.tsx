import { BuyForm } from "@/components/UtilSwap/BuyForm";
import { SellForm } from "@/components/UtilSwap/SellForm";
import { ApproveForm } from "@/components/UtilSwap/ApproveForm";

export default function Swap() {
    return (
        <div className="flex flex-col gap-8">
            <BuyForm />
            <SellForm />
            <ApproveForm />
        </div>
    )
}
