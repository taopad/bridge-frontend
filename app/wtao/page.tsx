import { BridgeLayout } from "@/components/BridgeLayout"
import { BridgeCard } from "@/components/BridgeCard/BridgeCard"
import { BridgeForm } from "@/components/BridgeCard/BridgeForm"
import { NetworkCard } from "@/components/NetworkCard/NetworkCard"
import { TokenAddresses } from "@/components/TokenAddresses"

const name = "wTao"

export default function wTao() {
    return (
        <BridgeLayout token="wtao">
            <NetworkCard />
            <BridgeCard name={name}>
                <BridgeForm version="v1" />
            </BridgeCard>
            <TokenAddresses name={name} />
        </BridgeLayout>
    )
}
