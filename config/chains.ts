import { chains } from "./wallet";
import { encodePacked } from "viem";

export type LzId = 101 | 110

export type SupportedChainId = typeof chains[number]["id"]

export type ChainConfig = {
    name: string
    logo: string
    lzId: LzId
    adapterParams: `0x${string}`
}

const adapterParams200k = encodePacked(['uint16', 'uint256'], [1, 200000n])
const adapterParams2m = encodePacked(['uint16', 'uint256'], [1, 2000000n])

export const info: Record<SupportedChainId, ChainConfig> = {
    [1]: {
        name: "Ethereum",
        logo: "ethereum-eth-logo",
        lzId: 101,
        adapterParams: adapterParams200k,
    },
    [42161]: {
        name: "Arbitrum",
        logo: "arbitrum-arb-logo",
        lzId: 110,
        adapterParams: adapterParams2m,
    },
}

// check all lzId are set and unique
let seen: Record<LzId, number> = { 101: 0, 110: 0 }

for (const key in info) {
    const lzId = (info as any)[key].lzId as LzId;
    if (seen[lzId] == 1) {
        throw Error("invalid config")
    }
    seen[lzId]++
}
