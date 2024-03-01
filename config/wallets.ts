import { mainnet, arbitrum } from "wagmi/chains"
import { createConfig, http, fallback } from "wagmi"
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
    },
})

const tbank = createConfig({
    ssr: true,
    connectors,
    chains: [mainnet, arbitrum],
    transports: {
        [mainnet.id]: fallback([http(rpcs[mainnet.id]), http()]),
        [arbitrum.id]: fallback([http(rpcs[arbitrum.id]), http()]),
    },
})

export const configs = { wtao, tbank }
