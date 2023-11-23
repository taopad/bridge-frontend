"use client";

import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import { RouterContract, NativeTokenContract } from "@/config/contracts";
import { useBigintInput } from "@/hooks/useBigintInput";

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

function useSellToken(amount: bigint) {
    const { isConnected, address } = useAccount()

    const deadline = BigInt(Math.floor(Date.now() / 1000) + (60 * 60 * 24))

    const { config } = usePrepareContractWrite({
        ...RouterContract,
        "functionName": "swapExactTokensForETHSupportingFeeOnTransferTokens",
        args: [amount, 0n, [NativeTokenContract.address, WETH], address ?? "0x", deadline],
        account: address,
        enabled: isConnected && amount > 0,
    })

    return useContractWrite(config)
}

export function SellForm() {
    const amount = useBigintInput(0n, 18)
    const { isLoading, write } = useSellToken(amount.value)

    const disabled = amount.value === 0n || !write || isLoading

    return (
        <form onSubmit={e => e.preventDefault()}>
            <input
                type="number"
                value={amount.valueStr}
                onChange={e => amount.setValueStr(e.target.value.trim())}
                className="border px-4 py-2"
                placeholder="$NTKN"
            />
            <button
                type="button"
                className="border px-4 py-2"
                onClick={() => write?.()}
                disabled={disabled}
            >
                Sell
            </button>
        </form>
    )
}
