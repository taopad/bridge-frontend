import { BridgeLayout } from "@/components/BridgeLayout"
import { BridgeCard } from "@/components/BridgeCard/BridgeCard"
import { NetworkCard } from "@/components/NetworkCard/NetworkCard"
import { TokenAddresses } from "@/components/TokenAddresses"

const name = "TBANK"

export default function TBANK() {
    return (
        <BridgeLayout token="tbank">
            <NetworkCard />
            <BridgeCard name={name} />
            <TokenAddresses name={name} />
        </BridgeLayout>
    )
}
