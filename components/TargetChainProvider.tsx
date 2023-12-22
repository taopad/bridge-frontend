"use client";

import { useState, createContext } from "react";
import { SupportedChainId } from "@/config/chains";

type TargetChainState = {
    targetChainId: SupportedChainId | undefined
    setTargetChainId: (chainId: SupportedChainId | undefined) => void
}

export const TargetChainContext = createContext<TargetChainState>({
    targetChainId: undefined,
    setTargetChainId: (chainId) => { }
})

export function TargetChainProvider({ children }: { children: React.ReactNode }) {
    const [targetChainId, setTargetChainId] = useState<SupportedChainId | undefined>(undefined)

    return (
        <TargetChainContext.Provider value={{ targetChainId, setTargetChainId }}>
            {children}
        </TargetChainContext.Provider>
    )
}
