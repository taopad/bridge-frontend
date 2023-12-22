"use client";

import { Spinner } from "@/components/Spinner";
import { useDebounce } from "@/hooks/useDebounce";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useBigintInput } from "@/hooks/useBigintInput";
import { useSourceBalance } from "@/hooks/useSourceBalance";
import { useTargetBalance } from "@/hooks/useTargetBalance";
import { useSourceChainInfo } from "@/hooks/useSourceChainInfo";
import { useTargetChainInfo } from "@/hooks/useTargetChainInfo";
import { useAccount, useContractRead, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { getTokenContract, getOftContract } from "@/config/contracts";

function useAllowance() {
    const { id } = useSourceChainInfo()
    const { isConnected, address } = useAccount()

    const oft = getOftContract(id)
    const token = getTokenContract(id)

    return useContractRead({
        ...token,
        functionName: "allowance",
        args: [address ?? "0x", oft.address ?? "0x"],
        scopeKey: address,
        enabled: isConnected,
    })
}

function useApprove() {
    const { id } = useSourceChainInfo()
    const { isConnected, address } = useAccount()
    const allowance = useAllowance()

    const oft = getOftContract(id)
    const token = getTokenContract(id)

    const prepare = usePrepareContractWrite({
        ...token,
        functionName: "approve",
        args: [oft.address ?? "0x", BigInt(2 ** (256 - 1))],
        scopeKey: address,
        enabled: isConnected
            && oft.address != undefined
            && token.address != undefined,
    })

    const action = useContractWrite(prepare.config)

    const wait = useWaitForTransaction({
        hash: action.data?.hash, onSuccess() {
            allowance.refetch()
        }
    })

    return { prepare, action, wait }
}

//function useStake(amount: bigint, reset: () => void) {
//    const { id } = useSourceChainInfo()
//    const { isConnected, address } = useAccount()
//
//    const allowance = useAllowance()
//    const sourceBalance = useSourceBalance()
//    const targetBalance = useTargetBalance()
//
//    const oft = getOftContract(id)
//
//    const prepare = usePrepareContractWrite({
//        ...oft,
//        functionName: "sendFrom",
//        args: [],
//        scopeKey: address,
//        enabled: isConnected
//            && oft.address != undefined
//            && amount > 0
//            && amount <= (sourceBalance.data?.value ?? 0n)
//            && amount <= (allowance.data ?? 0n),
//    })
//
//    const action = useContractWrite(prepare.config)
//
//    const wait = useWaitForTransaction({
//        hash: action.data?.hash, onSuccess() {
//            reset()
//            sourceBalance.refetch()
//            targetBalance.refetch()
//        }
//    })
//
//    return { prepare, action, wait }
//}

export function BridgeForm() {
    const { data } = useSourceBalance()

    const amount = useBigintInput(0n, data?.decimals ?? 0)

    return (
        <div className="flex flex-col gap-4 lg:flex-row">
            <div className="form-control flex-1">
                <div className="flex gap-1">
                    <input
                        type="text"
                        className="px-6 py-4 text-lg text-black w-full rounded-lg"
                        value={amount.valueStr}
                        onChange={e => amount.setValueStr(e.target.value.trim())}
                    />
                    <MaxButton setAmount={amount.setValue} />
                </div>
            </div>
            <div>
                <SubmitButton amount={amount.value} reset={amount.reset} />
            </div>
        </div>
    )
}

function MaxButton({ setAmount }: { setAmount: (amount: bigint) => void }) {
    const hasMounted = useHasMounted()
    const { data, isSuccess } = useSourceBalance()

    const balance = data?.value ?? 0n

    const disabled = !hasMounted || !isSuccess;

    return (
        <button disabled={disabled} onClick={() => setAmount(balance)} className="card-button w-16">
            Max
        </button>
    )
}

function SubmitButton({ amount, reset }: { amount: bigint, reset: () => void }) {
    const allowance = useAllowance()
    const hasMounted = useHasMounted()
    const { data, isSuccess } = useSourceBalance()

    const insufficientBalance = amount > (data?.value ?? 0n)
    const insufficientAllowance = amount > (allowance.data ?? 0n)

    if (!hasMounted || !isSuccess) {
        return (
            <button disabled className="card-button w-full h-full lg:w-48">
                Bridge
            </button>
        )
    }

    if (insufficientBalance) {
        return (
            <button disabled className="card-button w-full h-full lg:w-48">
                Ins. balance
            </button>
        )
    }

    if (insufficientAllowance) {
        return <ApproveButton />
    }

    return <StakeButton amount={amount} reset={reset} />
}

function ApproveButton() {
    const { prepare, action, wait } = useApprove()

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = preparing || sending

    return (
        <button disabled={disabled} onClick={() => action.write?.()} className="card-button w-full h-full lg:w-48">
            <Spinner enabled={sending} /> <span>Approve</span>
        </button>
    )
}

function StakeButton({ amount, reset }: { amount: bigint, reset: () => void }) {
    const source = useSourceChainInfo()
    const target = useTargetChainInfo()
    //    const [debouncedAmount, debouncing] = useDebounce(amount)
    //    const { prepare, action, wait } = useStake(debouncedAmount, reset)

    const zeroAmount = amount === 0n

    const disabled = zeroAmount || !source.id || !target.id

    //    const preparing = prepare.isLoading || prepare.isError || !action.write
    //    const sending = action.isLoading || wait.isLoading
    //    const disabled = zeroAmount || preparing || sending || debouncing
    //
    //    return (
    //        <button disabled={disabled} onClick={() => action.write?.()} className="card-button w-full h-full lg:w-48">
    //            <Spinner enabled={sending} /> <span>Bridge</span>
    //        </button>
    //    )

    return (
        <button
            className="card-button w-full h-full lg:w-48"
            onClick={() => alert(amount.toString())}
            disabled={disabled}
        >
            Bridge
        </button>
    )
}
