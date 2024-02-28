"use client";

import { useEffect } from "react";
import { chains } from "@/config/wallet";
import { SupportedChainId, info } from "@/config/chains";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useTargetChain } from "@/hooks/useTargetChain";
import { useSourceChainInfo } from "@/hooks/useSourceChainInfo";
import { Select } from "@radix-ui/react-select";
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

export function TargetChainSelector() {
    const { id } = useSourceChainInfo();
    const { targetChainId, setTargetChainId } = useTargetChain();

    const value = targetChainId ?? "none";

    useEffect(() => {
        if (id === value) {
            setTargetChainId(undefined);
        }
    }, [id, value, setTargetChainId]);

    return (
        <Select
            onValueChange={(e) => setTargetChainId(targetValueToChainId(e))}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select target chain" />
            </SelectTrigger>
            <SelectContent>
                {chains.map((chain) => (
                    <Option key={chain.id} chainId={chain.id} />
                ))}
            </SelectContent>
        </Select>
    );
}

function Option({ chainId }: { chainId: SupportedChainId }) {
    const { id } = useSourceChainInfo();
    const hasMounted = useHasMounted();

    if (!hasMounted) return null;

    return (
        <SelectItem value={chainId as any} disabled={chainId === id}>
            {info[chainId].name}
        </SelectItem>
    );
}

function targetValueToChainId(value: string) {
    if (value == "none") return undefined;

    const chainId = parseInt(value);

    if (isNaN(chainId)) return undefined;

    return chainId as SupportedChainId;
}
