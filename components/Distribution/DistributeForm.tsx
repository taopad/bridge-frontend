"use client";

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { NativeTokenContract } from "@/config/contracts";
import { useExpectedRewards } from "@/hooks/useExpectedRewards";
import { Spinner } from "@/components/Spinner";

function useDistribute() {
    const expectedRewards = useExpectedRewards()

    const expected = expectedRewards.data ?? 0n

    const prepare = usePrepareContractWrite({
        ...NativeTokenContract,
        "functionName": "distribute",
        args: [expected],
        enabled: expectedRewards.isSuccess && expected > 0
    })

    const action = useContractWrite(prepare.config)

    const wait = useWaitForTransaction({ hash: action.data?.hash })

    return { prepare, action, wait }
}

export function DistributeForm() {
    const expectedRewards = useExpectedRewards()
    const { prepare, action, wait } = useDistribute()

    const expected = expectedRewards.data ?? 0n

    const hasRewards = expectedRewards.isSuccess && expected > 0n

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
