"use client";

import Image from "next/image";

import { useAccount, useNetwork } from "wagmi";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useHasMounted } from "@/hooks/useHasMounted";
import { SupportedChainId, info } from "@/config/chains";
import { Button } from "../ui/button";

export function SourceChainButton() {
	const { chain } = useNetwork();
	const { isConnected } = useAccount();
	const { openChainModal } = useChainModal();
	const { openConnectModal } = useConnectModal();
	const hasMounted = useHasMounted();

	if (!hasMounted) return <FallbackButton />;

	if (!isConnected || !chain)
		return <Button onClick={openConnectModal}>Connect wallet</Button>;

	if (chain.unsupported)
		return (
			<Button variant={"destructive"} onClick={openChainModal}>
				Unsupported chain
			</Button>
		);

	const { name, logo } = info[chain.id as SupportedChainId];

	return (
		<Button onClick={openChainModal}>
			<Image
				className="h-6 w-6"
				width={1}
				height={1}
				src={`/logos/${logo}.svg`}
				alt={name}
			/>
			<div className="flex-1">{name}</div>
		</Button>
	);
}

function FallbackButton() {
	return (
		<Button disabled={true}>
			<div className="h-6">&nbsp;</div>
		</Button>
	);
}
