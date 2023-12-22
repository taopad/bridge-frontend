import OftV2Abi from "./abi/OftV2";
import OftV2ProxyAbi from "./abi/OftV2Proxy";
import IERC20MetadataAbi from "./abi/IERC20Metadata";
import { SupportedChainId } from "./chains";

if (!process.env.NEXT_PUBLIC_PROXY_ADDRESS) throw Error("NEXT_PUBLIC_PROXY_ADDRESS env variable must be set");
if (!process.env.NEXT_PUBLIC_MAINNET_ADDRESS) throw Error("NEXT_PUBLIC_MAINNET_ADDRESS env variable must be set");
if (!process.env.NEXT_PUBLIC_ARBITRUM_ADDRESS) throw Error("NEXT_PUBLIC_ARBITRUM_ADDRESS env variable must be set");

export const ProxyContract = {
    abi: OftV2ProxyAbi,
    address: process.env.NEXT_PUBLIC_PROXY_ADDRESS as `0x${string}`,
}

type TokenContract = {
    abi: typeof IERC20MetadataAbi | typeof OftV2Abi,
    address: `0x${string}`
}

export const TokenContracts: Record<SupportedChainId, TokenContract> = {
    [1]: {
        abi: IERC20MetadataAbi,
        address: process.env.NEXT_PUBLIC_MAINNET_ADDRESS as `0x${string}`,
    },
    [42161]: {
        abi: OftV2Abi,
        address: process.env.NEXT_PUBLIC_ARBITRUM_ADDRESS as `0x${string}`,
    },
}
