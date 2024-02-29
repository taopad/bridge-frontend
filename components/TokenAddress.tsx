import { TokenConfig } from "@/config/tokens"
import { Address } from "@/components/Address"

export function TokenAddress({ token }: { token: TokenConfig }) {
    return (
        <div className="flex gap-4">
            <div className="w-[160px] text-left">{token.info.chain.name}:</div>
            <Address>{token.oft}</Address>
        </div>
    )
}
