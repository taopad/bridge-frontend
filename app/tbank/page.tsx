import { BridgeLayout } from "@/components/BridgeLayout"
import { TokenAddresses } from "@/components/TokenAddresses"
import { BridgeCard } from "@/components/BridgeCard/BridgeCard"
import { BridgeForm } from "@/components/BridgeCard/BridgeForm"
import { NetworkCard } from "@/components/NetworkCard/NetworkCard"

const name = "TBANK"

export default function wTao() {
    return (
        <BridgeLayout token="tbank">
            <NetworkCard />
            <BridgeCard name={name}>
                <BridgeForm version="v2" />
            </BridgeCard>
            <TokenAddresses name={name} />
        </BridgeLayout>
    )
}
