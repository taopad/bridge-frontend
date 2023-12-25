import { useTargetChain } from "./useTargetChain";

export function useTargetChainId() {
    const { targetChainId } = useTargetChain()

    return targetChainId
}
