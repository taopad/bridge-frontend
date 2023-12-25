import { info } from "@/config/chains";
import { useSourceChainId } from "./useSourceChainId";

export function useSourceChainInfo() {
    const id = useSourceChainId()

    const selected = id ? info[id] : undefined

    return { id, info: selected }
}
