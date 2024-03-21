import Link from "next/link"

export function Footer() {
    return (
        <div className="my-4 text-center">
            <p>
                Built by{" "}
                <Link href="https://taopad.io" target="_blank">
                    TaoPad
                </Link>.
            </p>
            <p>
                Powered by{" "}
                <Link href="https://layerzero.network/" target="_blank">
                    LayerZero
                </Link>.
            </p>
        </div>
    )
}
