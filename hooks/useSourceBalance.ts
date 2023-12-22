import { useNetwork, useAccount, useBalance } from "wagmi";
import { TokenContracts } from "@/config/contracts";
import { SupportedChainId } from "@/config/chains";

export function useSourceBalance() {
    const { chain } = useNetwork()
    const { address } = useAccount()

    const chainId = chain && !chain.unsupported ? chain.id as SupportedChainId : undefined

    const token = chainId ? TokenContracts[chainId].address : undefined

    return useBalance({ address, token });
}
