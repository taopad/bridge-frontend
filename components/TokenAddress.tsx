import { TokenConfig } from "@/config/tokens"
import { Address } from "@/components/Address"

export function TokenAddress({ token }: { token: TokenConfig }) {
    return (
        <div className="flex gap-4">
            <div className="w-[120px] text-right">{token.info.chain.name}:</div>
            <Address>{token.oft}</Address>
        </div>
    )
}
