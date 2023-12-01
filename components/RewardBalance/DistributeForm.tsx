"use client";

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { NativeTokenContract } from "@/config/contracts";
import { Spinner } from "@/components/Spinner";

function useDistribute() {
    const prepare = usePrepareContractWrite({
        ...NativeTokenContract,
        "functionName": "distribute",
    })

    const action = useContractWrite(prepare.config)

    const wait = useWaitForTransaction({ hash: action.data?.hash })

    return { prepare, action, wait }
}

export function DistributeForm() {
    const { prepare, action, wait } = useDistribute()

    const loading = prepare.isLoading || action.isLoading || wait.isLoading
    const disabled = loading || !action.write

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
