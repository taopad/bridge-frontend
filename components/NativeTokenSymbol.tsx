"use client";

import { useAppStatic } from "@/hooks/useAppStatic";
import { useHasMounted } from "@/hooks/useHasMounted";

export function NativeTokenSymbol() {
    const appStatic = useAppStatic()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && appStatic.isSuccess

    const symbol = appStatic.data?.tokens.native.symbol.result ?? ""

    return (
        <span>
            {loaded ? symbol : '-'}
        </span>
    )
}
