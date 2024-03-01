"use client"

import "@rainbow-me/rainbowkit/styles.css"

import { useState } from "react"
import { WagmiProvider } from "wagmi"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { configs } from "@/config/wallets"

type TokenType = "wtao" | "tbank"

export function WalletProvider({ token, children }: { token: TokenType, children: React.ReactNode }) {
    const config = configs[token]
    const [queryClient] = useState(() => new QueryClient())

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
