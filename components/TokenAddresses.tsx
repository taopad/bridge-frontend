"use client"

import { useTokenConfig } from "@/hooks/useTokenConfig"
import { TokenAddress } from "@/components/TokenAddress"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function TokenAddresses({ name }: { name: string }) {
    const { tokenConfigList } = useTokenConfig()

    if (tokenConfigList === undefined) {
        return null
    }

    return (
        <Card className="bg-black">
            <CardHeader>{name} token addresses:</CardHeader>
            <CardContent>
                {Object.values(tokenConfigList).map(token => (
                    <TokenAddress key={token.chain.id} token={token} />
                ))}
            </CardContent>
        </Card>
    )
}
