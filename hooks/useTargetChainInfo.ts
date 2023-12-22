import { useContext } from "react";
import { info } from "@/config/chains";
import { TargetChainContext } from "@/components/TargetChainProvider";

export function useTargetChainInfo() {
    const { targetChainId } = useContext(TargetChainContext)

    const selected = targetChainId ? info[targetChainId] : undefined

    return { targetChainId, info: selected }
}
