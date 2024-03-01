"use client"

import { useAccount } from "wagmi"
import { createContext, useState, useEffect } from "react"
import { TokenConfig, TokenConfigList, configs } from "@/config/tokens"

type TokenType = "wtao" | "tbank"

type TokenConfigState = {
    sourceToken: TokenConfig | undefined
    targetToken: TokenConfig | undefined
    tokenConfigList: TokenConfigList | undefined
    setTargetChainId: (chainId: number | undefined) => void
}

export const TokenConfigContext = createContext<TokenConfigState>({
    sourceToken: undefined,
    targetToken: undefined,
    tokenConfigList: undefined,
    setTargetChainId: (chainId: number | undefined) => { },
})

export function TokenConfigProvider({ token, children }: { token: TokenType, children: React.ReactNode }) {
    const { chain } = useAccount()
    const [targetChainId, setTargetChainId] = useState<number>()
    const tokenConfigList = configs[token]

    const sourceChainId = chain?.id

    const sourceToken = tokenConfigList[sourceChainId ?? 0] ?? undefined
    const targetToken = tokenConfigList[targetChainId ?? 0] ?? undefined

    useEffect(() => {
        if (sourceChainId !== undefined && sourceChainId === targetChainId) {
            setTargetChainId(undefined)
        }
    }, [sourceChainId, targetChainId])

    return (
        <TokenConfigContext.Provider value={{ sourceToken, targetToken, tokenConfigList, setTargetChainId }}>
            {children}
        </TokenConfigContext.Provider>
    )
}
