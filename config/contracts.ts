import OftV2Abi from "./abi/OftV2";
import OftV2ProxyAbi from "./abi/OftV2Proxy";
import IERC20MetadataAbi from "./abi/IERC20Metadata";
import { SupportedChainId } from "./chains";

if (!process.env.NEXT_PUBLIC_PROXY_ADDRESS) throw Error("NEXT_PUBLIC_PROXY_ADDRESS env variable must be set");
if (!process.env.NEXT_PUBLIC_MAINNET_ADDRESS) throw Error("NEXT_PUBLIC_MAINNET_ADDRESS env variable must be set");
if (!process.env.NEXT_PUBLIC_ARBITRUM_ADDRESS) throw Error("NEXT_PUBLIC_ARBITRUM_ADDRESS env variable must be set");

type TokenContract = {
    abi: typeof IERC20MetadataAbi,
    address: `0x${string}`
}

type OftContract = {
    abi: typeof OftV2ProxyAbi | typeof OftV2Abi,
    address: `0x${string}`
}

export const TokenContracts: Record<SupportedChainId, TokenContract> = {
    [1]: {
        abi: IERC20MetadataAbi,
        address: process.env.NEXT_PUBLIC_MAINNET_ADDRESS as `0x${string}`,
    },
    [42161]: {
        abi: IERC20MetadataAbi,
        address: process.env.NEXT_PUBLIC_ARBITRUM_ADDRESS as `0x${string}`,
    },
}

export const OftContracts: Record<SupportedChainId, OftContract> = {
    [1]: {
        abi: OftV2ProxyAbi,
        address: process.env.NEXT_PUBLIC_PROXY_ADDRESS as `0x${string}`,
    },
    [42161]: {
        abi: OftV2Abi,
        address: process.env.NEXT_PUBLIC_ARBITRUM_ADDRESS as `0x${string}`,
    },
}

export function getTokenContract(chainId: SupportedChainId | undefined) {
    return chainId ? TokenContracts[chainId] : { abi: undefined, address: undefined }
}

export function getOftContract(chainId: SupportedChainId | undefined) {
    return chainId ? OftContracts[chainId] : { abi: undefined, address: undefined }
}
