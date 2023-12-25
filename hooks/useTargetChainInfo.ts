import { info } from "@/config/chains";
import { useTargetChainId } from "./useTargetChainId";

export function useTargetChainInfo() {
    const id = useTargetChainId()

    const selected = id ? info[id] : undefined

    return { id, info: selected }
}
