import { chains } from "./wallet";
import { parseEther, encodePacked } from "viem";

export type LzId = 101 | 110

export type SupportedChainId = typeof chains[number]["id"]

export type ChainConfig = {
    name: string
    logo: string
    lzId: LzId
    adapterParams: `0x${string}`
}

const signature = ["uint16", "uint256", "uint256", "address"]

const addressOnDst = "0x103A6781FDEa75eec690aCBfE12D7416E7c58900";

const nativeForDstEther = parseEther("0.001");

export const info: Record<SupportedChainId, ChainConfig> = {
    [1]: {
        name: "Ethereum",
        logo: "ethereum-eth-logo",
        lzId: 101,
        adapterParams: encodePacked(signature, [2, 200000n, nativeForDstEther, addressOnDst]),
    },
    [42161]: {
        name: "Arbitrum",
        logo: "arbitrum-arb-logo",
        lzId: 110,
        // 2M gas for arbitrum as stated in layerzero oft docs.
        adapterParams: encodePacked(signature, [2, 2000000n, nativeForDstEther, addressOnDst]),
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
