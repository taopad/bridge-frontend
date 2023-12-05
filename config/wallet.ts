import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { injectedWallet, trustWallet, rabbyWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public"
import { mainnet } from "wagmi/chains";
import { buildTestnet } from "./testnet";

// select the chain
const chain = process.env.NEXT_PUBLIC_APP_ENV === "prod" ? mainnet : buildTestnet()

// Beh project id
const projectId = "cc0001030a2db410113db693aa39f465"

// testnet config
export const { chains, publicClient } = configureChains([chain], [
    publicProvider(),
]);

const { connectors } = getDefaultWallets({
    appName: "TaoPad",
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
