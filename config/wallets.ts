import { mainnet, arbitrum, base } from "wagmi/chains"
import { createConfig, createStorage, cookieStorage, http, fallback } from "wagmi"
import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import {
    injectedWallet,
    rainbowWallet,
    coinbaseWallet,
    walletConnectWallet,
    trustWallet,
    rabbyWallet,
} from "@rainbow-me/rainbowkit/wallets"

const appName = "Taobridge"
const projectId = "837b08b6b8d6605f4240190ca6624fa5"

const rpcs = {
    [mainnet.id]: "https://eth-mainnet.g.alchemy.com/v2/Hvky-afpKHoxm1AgXx7sLw_Sw8h7bGh0",
    [arbitrum.id]: "https://arb-mainnet.g.alchemy.com/v2/i9AeLXoqu2gpJpClZRYnWdhOibz3i-h7",
    [base.id]: "https://rpc.ankr.com/base",
}

const connectors = connectorsForWallets(
    [
        {
            groupName: 'Wallets',
            wallets: [
                injectedWallet,
                rainbowWallet,
                coinbaseWallet,
                walletConnectWallet,
                trustWallet,
                rabbyWallet,
            ],
        },
    ],
    { appName, projectId }
)

const wtao = createConfig({
    ssr: true,
    connectors,
    chains: [mainnet, arbitrum],
    transports: {
        [mainnet.id]: fallback([http(rpcs[mainnet.id]), http()]),
        [arbitrum.id]: fallback([http(rpcs[arbitrum.id]), http()]),
        // [base.id]: fallback([http(rpcs[base.id]), http()]),
    },
    storage: createStorage({ key: "wagmi-wtao", storage: cookieStorage }),
})

const tbank = createConfig({
    ssr: true,
    connectors,
    chains: [mainnet, arbitrum],
    transports: {
        [mainnet.id]: fallback([http(rpcs[mainnet.id]), http()]),
        [arbitrum.id]: fallback([http(rpcs[arbitrum.id]), http()]),
    },
    storage: createStorage({ key: "wagmi-tbank", storage: cookieStorage }),
})

export const configs = { wtao, tbank }
