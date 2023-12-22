import { useContext } from "react";
import { TargetChainContext } from "@/components/TargetChainProvider";

export function useTargetChain() {
    return useContext(TargetChainContext)
}
