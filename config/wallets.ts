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

const transports = {
    [mainnet.id]: fallback([
        http("https://eth-mainnet.g.alchemy.com/v2/Hvky-afpKHoxm1AgXx7sLw_Sw8h7bGh0"),
        http("https://rpc.ankr.com/eth"),
        http(),
    ]),
    [arbitrum.id]: fallback([
        http("https://arb-mainnet.g.alchemy.com/v2/i9AeLXoqu2gpJpClZRYnWdhOibz3i-h7"),
        http("https://rpc.ankr.com/arbitrum"),
        http(),
    ]),
    [base.id]: fallback([
        http("https://base-mainnet.g.alchemy.com/v2/XD74L4pjyzymiePLbPlPsRQ7pQoQWpVp"),
        http("https://rpc.ankr.com/base"),
        http(),
    ]),
}

const wtao = createConfig({
    ssr: true,
    connectors,
    transports,
    storage: createStorage({ key: "wagmi-wtao", storage: cookieStorage }),
    chains: [mainnet, arbitrum, base],
})

const tbank = createConfig({
    ssr: true,
    connectors,
    transports,
    storage: createStorage({ key: "wagmi-tbank", storage: cookieStorage }),
    chains: [mainnet, arbitrum],
})

export const configs = { wtao, tbank }
