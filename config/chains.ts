import { chains } from "./wallet";

export type SupportedChainId = typeof chains[number]["id"]

export type ChainConfig = {
    name: string,
    logo: string,
}

export const info: Record<SupportedChainId, ChainConfig> = {
    [1]: {
        name: "Ethereum",
        logo: "ethereum-eth-logo",
    },
    [42161]: {
        name: "Arbitrum",
        logo: "arbitrum-arb-logo",
    },
}
