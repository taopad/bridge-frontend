"use client";

import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { NativeTokenContract } from "@/config/contracts";

function useDistribute() {
    const { config } = usePrepareContractWrite({
        ...NativeTokenContract,
        "functionName": "distribute",
    })

    return useContractWrite(config)
}

export function DistributeForm() {
    const { isLoading, write } = useDistribute()

    const disabled = !write || isLoading

    return (
        <form onSubmit={e => e.preventDefault()}>
            <button
                type="button"
                className="border px-4 py-2"
                onClick={() => write?.()}
                disabled={disabled}
            >
                Trigger rewards
            </button>
        </form>
    )
}
