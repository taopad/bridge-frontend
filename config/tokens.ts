import { Chain } from "viem"
import { mainnet, arbitrum, base } from "viem/chains"

// all token/oft addresses.
const WTAO_PROXY_ADDRESS: `0x${string}` = "0x4D9B7203BcF5B226A6f4Dc89DA68E7922bfE1322"
const WTAO_MAINNET_ADDRESS: `0x${string}` = "0x77E06c9eCCf2E797fd462A92B6D7642EF85b0A44"
const WTAO_ARBITRUM_ADDRESS: `0x${string}` = "0xa14a26bb46e236da394da6B09a5b4CF737ce707b"
const WTAO_BASE_ADDRESS: `0x${string}` = "0x9D19e729A1bAAfc87f4BC13FF05ce64EADfb9BbB"

const TBANK_PROXY_ADDRESS: `0x${string}` = "0x1762c17f671FA27cE6C59256f5F28242de9274d0"
const TBANK_MAINNET_ADDRESS: `0x${string}` = "0x95CcffaE3Eb8767D4a941Ec43280961dde89F4dE"
const TBANK_ARBITRUM_ADDRESS: `0x${string}` = "0x05cBeF357CB14F9861C01F90AC7d5C90CE0ef05e"

// hardcoded options.
const adapterParamsV1 = "0x00010000000000000000000000000000000000000000000000000000000000030d40"
const adapterParamsV1Arbitrum = "0x000100000000000000000000000000000000000000000000000000000000001e8480"
const adapterParamsV2 = "0x00030100110100000000000000000000000000030d40"

// configure tokens (wtao, tbank)
export type TokenConfig = {
    lzId: number
    chain: Chain
    logo: string
    token: `0x${string}`
    oft: `0x${string}`
    adapterParams: `0x${string}`
}

const wtao: Record<number, TokenConfig> = {
    [mainnet.id]: {
        lzId: 101,
        chain: mainnet,
        token: WTAO_MAINNET_ADDRESS,
        oft: WTAO_PROXY_ADDRESS,
        adapterParams: adapterParamsV1,
        logo: "ethereum-eth-logo.svg",
    },
    [arbitrum.id]: {
        lzId: 110,
        chain: arbitrum,
        token: WTAO_ARBITRUM_ADDRESS,
        oft: WTAO_ARBITRUM_ADDRESS,
        // 2M gas for arbitrum as stated in layerzero oft docs.
        adapterParams: adapterParamsV1Arbitrum,
        logo: "arbitrum-arb-logo.svg",
    },
    [base.id]: {
        lzId: 184,
        chain: base,
        token: WTAO_BASE_ADDRESS,
        oft: WTAO_BASE_ADDRESS,
        adapterParams: adapterParamsV1,
        logo: "base-logo.svg",
    },
}

const tbank: Record<number, TokenConfig> = {
    [mainnet.id]: {
        lzId: 30101,
        chain: mainnet,
        token: TBANK_MAINNET_ADDRESS,
        oft: TBANK_PROXY_ADDRESS,
        adapterParams: adapterParamsV2,
        logo: "ethereum-eth-logo.svg",
    },
    [arbitrum.id]: {
        lzId: 30110,
        chain: arbitrum,
        token: TBANK_ARBITRUM_ADDRESS,
        oft: TBANK_ARBITRUM_ADDRESS,
        adapterParams: adapterParamsV2,
        logo: "arbitrum-arb-logo.svg",
    },
}

export type TokenConfigList = typeof wtao | typeof tbank

export const configs = { wtao, tbank }

const validateConfig = (list: TokenConfigList) => {
    // ensure each chain has a different layer zero chain id
    const seen: Record<number, true> = {}

    Object.values(list).map(token => seen[token.lzId] = true)

    if (Object.keys(list).length !== Object.keys(seen).length) {
        throw new Error("wrong chain config")
    }
}

validateConfig(wtao)
validateConfig(tbank)
