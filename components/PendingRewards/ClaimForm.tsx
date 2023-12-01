"use client";

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { NativeTokenContract } from "@/config/contracts";
import { useUserInfo } from "@/hooks/useUserInfo";
import { Spinner } from "@/components/Spinner";

function useClaim() {
    const userInfo = useUserInfo()

    const rewards = userInfo.data?.rewards.result ?? 0n

    const prepare = usePrepareContractWrite({
        ...NativeTokenContract,
        "functionName": "claim",
        enabled: rewards > 0
    })

    const action = useContractWrite(prepare.config)

    const wait = useWaitForTransaction({ hash: action.data?.hash })

    return { prepare, action, wait }
}

export function ClaimForm() {
    const userInfo = useUserInfo()
    const { prepare, action, wait } = useClaim()

    const rewards = userInfo.data?.rewards.result ?? 0n

    const loading = prepare.isLoading || action.isLoading || wait.isLoading
    const disabled = loading || rewards === 0n || !action.write

    return (
        <form onSubmit={e => e.preventDefault()}>
            <button
                type="button"
                className="card-button"
                onClick={() => action.write?.()}
                disabled={disabled}
            >
                {loading ? <Spinner /> : "Claim"}
            </button>
        </form>
    )
}
