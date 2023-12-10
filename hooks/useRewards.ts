import { useContractRead } from "wagmi";
import { RewardTokenContract, QuoterContract } from "@/config/contracts";
import { useAppWatch } from "./useAppWatch";
import { useAppStatic } from "./useAppStatic";

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

export function useRewards() {
    const appWatch = useAppWatch()
    const appStatic = useAppStatic()

    const poolFee = appStatic.data?.poolFee.result ?? 0
    const collectedTax = appWatch.data?.collectedTax.result ?? 0n
    const donations = appWatch.data?.donations.result ?? 0n

    return useContractRead({
        ...QuoterContract,
        functionName: "quoteExactInputSingle",
        args: [{
            tokenIn: WETH,
            tokenOut: RewardTokenContract.address,
            amountIn: collectedTax,
            fee: poolFee,
            sqrtPriceLimitX96: 0n,
        }],
        watch: true,
        enabled: appStatic.isSuccess && poolFee > 0
            && appWatch.isSuccess && collectedTax > 0,
        select: (data) => ({
            expected: (data * 98n) / 100n, // allow 2% slippage
            total: data + donations,
        }),
    })
}
