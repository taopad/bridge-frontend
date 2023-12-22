import { BridgeCard } from "@/components/BridgeCard/BridgeCard";
import { NetworkCard } from "@/components/NetworkCard/NetworkCard";

export default function Home() {
    return (
        <main className="flex flex-col gap-4">
            <NetworkCard />
            <BridgeCard />
        </main>
    )
}
