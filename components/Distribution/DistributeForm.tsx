"use client";

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { NativeTokenContract } from "@/config/contracts";
import { useRewards } from "@/hooks/useRewards";
import { Spinner } from "@/components/Spinner";

function useDistribute() {
    const rewards = useRewards()

    const totalRewards = rewards.data?.total ?? 0n
    const expectedRewards = rewards.data?.expected ?? 0n

    const prepare = usePrepareContractWrite({
        ...NativeTokenContract,
        "functionName": "distribute",
        args: [expectedRewards],
        // it is important rewards mustbe a success because we want to
        // be sure expected rewards has been quoted.
        enabled: rewards.isSuccess && totalRewards > 0
    })

    const action = useContractWrite(prepare.config)

    const wait = useWaitForTransaction({ hash: action.data?.hash })

    return { prepare, action, wait }
}

export function DistributeForm() {
    const { prepare, action, wait } = useDistribute()

    const rewards = useRewards()

    const totalRewards = rewards.data?.total ?? 0n

    const hasRewards = rewards.isSuccess && totalRewards > 0

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
