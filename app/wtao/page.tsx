import { BridgeLayout } from "@/components/BridgeLayout"
import { BridgeCard } from "@/components/BridgeCard/BridgeCard"
import { NetworkCard } from "@/components/NetworkCard/NetworkCard"
import { TokenAddresses } from "@/components/TokenAddresses"

const name = "wTao"

export default function Wtao() {
    return (
        <BridgeLayout token="wtao">
            <NetworkCard />
            <BridgeCard name={name} />
            <TokenAddresses name={name} />
        </BridgeLayout>
    )
}
