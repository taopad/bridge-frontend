import { useBalance } from "wagmi";
import { NativeTokenContract } from "@/config/contracts";

export function useCollectedTax() {
    return useBalance({ ...NativeTokenContract, watch: true })
}
