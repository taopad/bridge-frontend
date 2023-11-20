"use client";

import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import { RouterContract, NativeTokenContract } from "@/config/contracts";

function useApprove() {
    const { isConnected, address } = useAccount()

    const { config } = usePrepareContractWrite({
        ...NativeTokenContract,
        "functionName": "approve",
        args: [RouterContract.address, BigInt(1000000 * (10 ** 18))],
        account: address,
        enabled: isConnected,
    })

    return useContractWrite(config)
}

export function ApproveForm() {
    const { isLoading, write } = useApprove()

    const disabled = !write || isLoading

    return (
        <form onSubmit={e => e.preventDefault()}>
            <button
                type="button"
                className="border px-4 py-2"
                onClick={() => write?.()}
                disabled={disabled}
            >
                Approve
            </button>
        </form>
    )
}
