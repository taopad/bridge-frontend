import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { injectedWallet, trustWallet, rabbyWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public"
import { mainnet, arbitrum } from "wagmi/chains";

// select the chain
const sources = [mainnet, arbitrum]

// Beh project id
const projectId = "837b08b6b8d6605f4240190ca6624fa5"

// testnet config
export const { chains, publicClient } = configureChains(sources, [publicProvider()]);

const { connectors } = getDefaultWallets({
    appName: "TaoPad wTao bridge",
    projectId,
    chains,
});

const moreConnectors = connectorsForWallets([
    {
        groupName: 'More wallets',
        wallets: [
            injectedWallet({ chains }),
            rabbyWallet({ chains }),
            trustWallet({ projectId, chains }),
        ],
    },
]);

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: () => [...connectors(), ...moreConnectors()],
    publicClient
})
