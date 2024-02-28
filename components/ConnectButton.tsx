"use client";

import { useAccount, useNetwork } from "wagmi";
import {
	useAccountModal,
	useChainModal,
	useConnectModal,
} from "@rainbow-me/rainbowkit";
import { useHasMounted } from "@/hooks/useHasMounted";
import { Button } from "./ui/button";

export function ConnectButton() {
	const { chain } = useNetwork();
	const { isConnected, address } = useAccount();
	const { openChainModal } = useChainModal();
	const { openConnectModal } = useConnectModal();
	const { openAccountModal } = useAccountModal();
	const hasMounted = useHasMounted();

	if (!hasMounted) return <FallbackButton />;

	if (!isConnected)
		return <Button onClick={openConnectModal}>Connect wallet</Button>;

	if (chain?.unsupported)
		return (
			<Button variant="destructive" onClick={openChainModal}>
				Wrong chain
			</Button>
		);

	return <Button onClick={openAccountModal}>{formatAddress(address)}</Button>;
}

function FallbackButton() {
	return (
		<Button disabled={true}>
			<div className="w-16 h-5"></div>
		</Button>
	);
}

function formatAddress(address: `0x${string}` | undefined) {
	return address
		? `${address.substring(0, 4)}...${address.substring(
				address.length - 4
		  )}`
		: "";
}
