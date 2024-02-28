import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "./ConnectButton";

export function Navbar() {
    return (
        <div className="flex container mx-auto py-4 justify-between items-center">
            <Link href="/" className="block relative w-32 h-16 lg:w-48">
                <Image
                    src="/TaoPadLogo.png"
                    alt="TaoPad"
                    fill
                    sizes="1"
                    style={{ objectFit: "contain" }}
                />
            </Link>
            <ConnectButton />
        </div>
    );
}
