import { BridgeLayout } from "@/components/BridgeLayout"
import { BridgeCard } from "@/components/BridgeCard/BridgeCard"
import { BridgeForm } from "@/components/BridgeCard/BridgeForm"
import { NetworkCard } from "@/components/NetworkCard/NetworkCard"
import { TokenAddresses } from "@/components/TokenAddresses"
import { Card, CardContent } from "@/components/ui/card"

const name = "TBANK"

export default function wTao() {
    return (
        <BridgeLayout token="tbank">
            <Card>
                <CardContent className="text-center p-5">
                    Coming soon
                </CardContent>
            </Card>
        </BridgeLayout>
    )
}
