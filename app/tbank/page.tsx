import { BridgeLayout } from "@/components/BridgeLayout"
import { BridgeCard } from "@/components/BridgeCard/BridgeCard"
import { NetworkCard } from "@/components/NetworkCard/NetworkCard"
import { BridgeFormV1 } from "@/components/BridgeCard/BridgeFormV1"
import { TokenAddresses } from "@/components/TokenAddresses"

const name = "TBANK"

export default function TBANK() {
    return (
        <BridgeLayout token="tbank">
            <NetworkCard />
            <BridgeCard name={name}>
                <BridgeFormV1 />
            </BridgeCard>
            <TokenAddresses name={name} />
        </BridgeLayout>
    )
}
