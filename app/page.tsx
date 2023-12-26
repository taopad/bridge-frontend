import { BridgeCard } from "@/components/BridgeCard/BridgeCard";
import { NetworkCard } from "@/components/NetworkCard/NetworkCard";
import { getTokenContract } from "@/config/contracts";
import { info } from "@/config/chains";

export default function Home() {
    return (
        <main className="flex flex-col gap-4">
            <NetworkCard />
            <BridgeCard />
            <div className="card flex flex-col gap-4">
                <h2>wTao token addresses:</h2>
                <div className="flex gap-4">
                    <div className="w-32 text-right">{info[1].name}</div>
                    <input
                        type="text"
                        className="bg-black text-white w-full border-0 flex-1 focus:outline-none focus:ring-0"
                        value={getTokenContract(1).address}
                        readOnly
                    />
                </div>
                <div className="flex gap-4">
                    <div className="w-32 text-right">{info[42161].name}</div>
                    <input
                        type="text"
                        className="bg-black text-white w-full border-0 flex-1 focus:outline-none focus:ring-0"
                        value={getTokenContract(42161).address}
                        readOnly
                    />
                </div>
            </div>
        </main>
    )
}
