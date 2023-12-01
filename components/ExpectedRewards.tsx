import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useExpectedRewards } from "@/hooks/useExpectedRewards";
import { useHasMounted } from "@/hooks/useHasMounted";
import { formatUnits } from "viem";

export function ExpectedRewards() {
    const tokenInfo = useTokenInfo()
    const expectedRewards = useExpectedRewards()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && tokenInfo.isSuccess && expectedRewards.isSuccess

    const expected = expectedRewards.data ?? 0n
    const decimals = tokenInfo.data?.reward.decimals.result ?? 0
    const units = formatUnits(expected, decimals)

    if (loaded) {
        return <span title={units}>{units}</span>
    }

    return null
}
