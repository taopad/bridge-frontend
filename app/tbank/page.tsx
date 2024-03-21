import Link from "next/link"
import { BridgeLayout } from "@/components/BridgeLayout"
import { TokenAddresses } from "@/components/TokenAddresses"
import { TokenCoverImage } from "@/components/TokenCoverImage"
import { BridgeCard } from "@/components/BridgeCard/BridgeCard"
import { BridgeForm } from "@/components/BridgeCard/BridgeForm"
import { NetworkCard } from "@/components/NetworkCard/NetworkCard"

const name = "TBANK"
const appUrl = "https://app.taobank.ai"
const coverUrl = "/covers/tbank.png"

export default function wTao() {
    return (
        <BridgeLayout token="tbank">
            <Link href={appUrl} target="_blank">
                <TokenCoverImage url={coverUrl} />
            </Link>
            <NetworkCard />
            <BridgeCard name={name}>
                <BridgeForm version="v2" />
            </BridgeCard>
            <TokenAddresses name={name} />
        </BridgeLayout>
    )
}
