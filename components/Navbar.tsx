import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "./ConnectButton";

export function Navbar() {
    return (
        <div className="flex">
            <div>
                <Link href="/" target="_blank" className="block relative w-32 h-16 lg:w-48">
                    <Image src="/TaoPadLogo.png" alt="TaoPad" fill sizes="1" style={{ objectFit: "contain" }} />
                </Link>
            </div>
            <div className="w-full py-4 flex items-center justify-end">
                <ConnectButton />
            </div>
        </div>
    )
}
