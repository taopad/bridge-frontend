import { useAccount, useBalance } from "wagmi";
import { TokenContracts } from "@/config/contracts";
import { SupportedChainId } from "@/config/chains";

export function useTargetBalance(chainId: SupportedChainId | undefined) {
    const { address } = useAccount()

    const token = chainId ? TokenContracts[chainId].address : undefined

    return useBalance({ chainId, address, token });
}
