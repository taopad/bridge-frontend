import { SupportedChainId, info } from "@/config/chains";

export function useTargetChainInfo(id: SupportedChainId | undefined) {
    const selected = id ? info[id] : undefined

    return { id, info: selected }
}
