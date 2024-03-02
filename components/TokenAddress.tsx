import { TokenConfig } from "@/config/tokens"
import { Address } from "@/components/Address"

export function TokenAddress({ token }: { token: TokenConfig }) {
    return (
        <div className="flex gap-4">
            <div className="w-[120px] text-right">{token.chain.name}:</div>
            <Address>{token.token}</Address>
        </div>
    )
}
