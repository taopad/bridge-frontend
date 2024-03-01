import { Chain, encodePacked } from "viem"
import { mainnet, arbitrum } from "viem/chains"

const WTAO_PROXY_ADDRESS: `0x${string}` = "0x4D9B7203BcF5B226A6f4Dc89DA68E7922bfE1322"
const WTAO_MAINNET_ADDRESS: `0x${string}` = "0x77E06c9eCCf2E797fd462A92B6D7642EF85b0A44"
const WTAO_ARBITRUM_ADDRESS: `0x${string}` = "0xa14a26bb46e236da394da6B09a5b4CF737ce707b"

const TBANK_PROXY_ADDRESS: `0x${string}` = "0x1762c17f671FA27cE6C59256f5F28242de9274d0"
const TBANK_MAINNET_ADDRESS: `0x${string}` = "0x95CcffaE3Eb8767D4a941Ec43280961dde89F4dE"
const TBANK_ARBITRUM_ADDRESS: `0x${string}` = "0x05cBeF357CB14F9861C01F90AC7d5C90CE0ef05e"

const signature = ["uint16", "uint256"]

const adapterParams = encodePacked(signature, [1, 200000n])
const arbitrumAdapterParams = encodePacked(signature, [1, 2000000n])

const chains = {
    [mainnet.id]: {
        lzId: 101,
        chain: mainnet,
        logo: "ethereum-eth-logo",
        adapterParams,
    },
    [arbitrum.id]: {
        lzId: 110,
        chain: arbitrum,
        logo: "arbitrum-arb-logo",
        // 2M gas for arbitrum as stated in layerzero oft docs.
        adapterParams: arbitrumAdapterParams,
    },
}

export type TokenConfig = {
    info: {
        lzId: number
        chain: Chain
        logo: string
        adapterParams: `0x${string}`
    }
    token: `0x${string}`
    oft: `0x${string}`
}

const wtao: Record<number, TokenConfig> = {
    [mainnet.id]: {
        info: chains[mainnet.id],
        token: WTAO_MAINNET_ADDRESS,
        oft: WTAO_PROXY_ADDRESS,
    },
    [arbitrum.id]: {
        info: chains[arbitrum.id],
        token: WTAO_ARBITRUM_ADDRESS,
        oft: WTAO_ARBITRUM_ADDRESS,
    },
}

const tbank: Record<number, TokenConfig> = {
    [mainnet.id]: {
        info: chains[mainnet.id],
        token: TBANK_MAINNET_ADDRESS,
        oft: TBANK_PROXY_ADDRESS,
    },
    [arbitrum.id]: {
        info: chains[arbitrum.id],
        token: TBANK_ARBITRUM_ADDRESS,
        oft: TBANK_ARBITRUM_ADDRESS,
    },
}

export type TokenConfigList = typeof wtao | typeof tbank

export const configs = { wtao, tbank }

// ensure each chain has a different layer zero chain id
const seen: Record<number, true> = {}

Object.values(chains).map(chain => seen[chain.lzId] = true)

if (Object.keys(chains).length !== Object.keys(seen).length) {
    throw new Error("wrong chain config")
}
