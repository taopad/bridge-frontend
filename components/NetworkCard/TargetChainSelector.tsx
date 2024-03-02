"use client"

import { Select } from "@radix-ui/react-select"
import { useTokenConfig } from "@/hooks/useTokenConfig"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TokenConfig } from "@/config/tokens"

export function TargetChainSelector() {
    const { targetToken, tokenConfigList, setTargetChainId } = useTokenConfig()

    if (tokenConfigList === undefined) {
        return null
    }

    return (
        <Select
            value={targetToken?.chain.id.toString() ?? ""}
            onValueChange={chainIdStr => setTargetChainId(parseInt(chainIdStr))}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select target chain" />
            </SelectTrigger>
            <SelectContent>
                {Object.values(tokenConfigList).map(token => (
                    <Option key={token.chain.id} token={token} />
                ))}
            </SelectContent>
        </Select>
    )
}

function Option({ token }: { token: TokenConfig }) {
    const { sourceToken } = useTokenConfig()

    const disabled = token.chain.id === sourceToken?.chain.id

    return (
        <SelectItem value={token.chain.id.toString()} disabled={disabled}>
            {token.chain.name}
        </SelectItem>
    )
}
