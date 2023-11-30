import Image from "next/image";
import { ConnectButton } from "./ConnectButton";

export function Navbar() {
    return (
        <div className="flex">
            <div className="relative w-48 py-4">
                <a href="/">
                    <Image src="/TaoPadLogo-NoBG.png" alt="TaoPad" fill style={{ objectFit: "contain" }} />
                </a>
            </div>
            <div className="w-full py-4 flex items-center justify-end">
                <ConnectButton />
            </div>
        </div>
    )
}
