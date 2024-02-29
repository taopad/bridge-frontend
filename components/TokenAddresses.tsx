"use client"

import { useTokenConfig } from "@/hooks/useTokenConfig"
import { TokenAddress } from "@/components/TokenAddress"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function TokenAddresses() {
    const { tokenConfigList } = useTokenConfig()

    if (tokenConfigList === undefined) {
        return null
    }

    return (
        <Card className="bg-black">
            <CardHeader>wTao token addresses:</CardHeader>
            <CardContent>
                {Object.values(tokenConfigList).map(token => (
                    <TokenAddress key={token.info.chain.id} token={token} />
                ))}
            </CardContent>
        </Card>
    )
}
