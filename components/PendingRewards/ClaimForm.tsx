"use client";

import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { NativeTokenContract } from "@/config/contracts";

function useClaim() {
    const { config } = usePrepareContractWrite({
        ...NativeTokenContract,
        "functionName": "claim",
    })

    return useContractWrite(config)
}

export function ClaimForm() {
    const { isLoading, write } = useClaim()

    const disabled = !write || isLoading

    return (
        <form onSubmit={e => e.preventDefault()}>
            <button
                type="button"
                className="card-button"
                onClick={() => write?.()}
                disabled={disabled}
            >
                Claim
            </button>
        </form>
    )
}
