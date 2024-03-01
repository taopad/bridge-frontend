import { BridgeLayout } from "@/components/BridgeLayout"
import { BridgeCard } from "@/components/BridgeCard/BridgeCard"
import { BridgeFormV1 } from "@/components/BridgeCard/BridgeFormV1"
import { NetworkCard } from "@/components/NetworkCard/NetworkCard"
import { TokenAddresses } from "@/components/TokenAddresses"

const name = "wTao"

export default function wTao() {
    return (
        <BridgeLayout token="wtao">
            <NetworkCard />
            <BridgeCard name={name}>
                <BridgeFormV1 />
            </BridgeCard>
            <TokenAddresses name={name} />
        </BridgeLayout>
    )
}
