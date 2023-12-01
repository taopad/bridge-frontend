"use client";

import { formatUnits } from "viem";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { formatAmount } from "@/utils/formatAmount";

export function NativeTokenBalance() {
    const userInfo = useUserInfo()
    const tokenInfo = useTokenInfo()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && tokenInfo.isSuccess && userInfo.isSuccess

    const decimals = tokenInfo.data?.native.decimals.result ?? 0
    const balance = userInfo.data?.balance.result ?? 0n
    const units = formatUnits(balance, decimals);

    if (loaded) {
        return <span title={units}>{formatAmount(units)}</span>
    }

    return null
}
