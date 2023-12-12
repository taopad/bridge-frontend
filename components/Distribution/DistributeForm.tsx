"use client";

import { parseEther } from "viem";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { NativeTokenContract } from "@/config/contracts";
import { useAppWatch } from "@/hooks/useAppWatch";
import { useCollectedTax } from "@/hooks/useCollectedTax";
import { Spinner } from "@/components/Spinner";

function useDistribute() {
    const appWatch = useAppWatch()
    const collectedTax = useCollectedTax()

    const ethPriceReward = appWatch.data?.ethPriceReward.result ?? 0n

    const emittedRewards = appWatch.data?.emittedRewards.result ?? 0n
    const collectedTaxAsEth = collectedTax.data?.value ?? 0n
    const collectedTaxAsReward = (collectedTaxAsEth * ethPriceReward) / parseEther("1")
    const expectedRewards = (collectedTaxAsReward * 98n) / 100n // allows 2% slippage
    const rewardBalance = collectedTaxAsReward + emittedRewards

    const prepare = usePrepareContractWrite({
        ...NativeTokenContract,
        "functionName": "distribute",
        args: [expectedRewards],
        // it is important to make sure the expected rewards price has been quoted.
        enabled: collectedTax.isSuccess && appWatch.isSuccess && rewardBalance > 0
    })

    const action = useContractWrite(prepare.config)

    const wait = useWaitForTransaction({ hash: action.data?.hash })

    return { prepare, action, wait }
}

export function DistributeForm() {
    const { prepare, action, wait } = useDistribute()

    const appWatch = useAppWatch()
    const collectedTax = useCollectedTax()

    const collectedTaxAsEth = collectedTax.data?.value ?? 0n
    const emittedRewards = appWatch.data?.emittedRewards.result ?? 0n

    const hasRewards = collectedTax.isSuccess && appWatch.isSuccess
        && (collectedTaxAsEth > 0 || emittedRewards > 0)

    const loading = prepare.isLoading || action.isLoading || wait.isLoading
    const disabled = loading || !hasRewards || !action.write

    return (
        <form onSubmit={e => e.preventDefault()}>
            <button
                type="button"
                className="card-button"
                onClick={() => action.write?.()}
                disabled={disabled}
            >
                {loading ? <Spinner /> : "Distribute"}
            </button>
        </form>
    )
}
