"use client"

import "@rainbow-me/rainbowkit/styles.css"

import { useState } from "react"
import { WagmiProvider, cookieToInitialState } from "wagmi"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { configs } from "@/config/wallets"

type TokenType = "wtao" | "tbank"

export function WalletProvider({ token, cookie, children }: { token: TokenType, cookie: string | null, children: React.ReactNode }) {
    const config = configs[token]
    const [queryClient] = useState(() => new QueryClient())

    const initialState = cookieToInitialState(config, cookie)

    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
