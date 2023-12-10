"use client";

import { useApr } from "@/hooks/useApr";
import { useHasMounted } from "@/hooks/useHasMounted";

export function Apr() {
    const apr = useApr()
    const hasMounted = useHasMounted()

    const aprValue = apr.data ?? 0n

    return hasMounted ? `${aprValue.toString()}%` : "0%"
}
