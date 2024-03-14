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

const appName = "Tao bridge"
const projectId = "837b08b6b8d6605f4240190ca6624fa5"

const rpcs = {
    [mainnet.id]: "https://rpc.ankr.com/eth",
    [arbitrum.id]: "https://rpc.ankr.com/arbitrum",
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
    chains: [mainnet, arbitrum, base],
    transports: {
        [mainnet.id]: fallback([http(rpcs[mainnet.id]), http()]),
        [arbitrum.id]: fallback([http(rpcs[arbitrum.id]), http()]),
        [base.id]: fallback([http(rpcs[base.id]), http()]),
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
