import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { WalletProvider } from "@/components/WalletProvider";
import { TargetChainProvider } from "@/components/TargetChainProvider";
import Link from "next/link";

const myFont = localFont({ src: "./RocGroteskWideMedium.otf" });

export const metadata: Metadata = {
	title: "Taobridge",
	description: "Taobridge (built by taopad.io)",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`dark ${myFont.className}`}
				style={{ backgroundImage: "url('/TaoBG20.jpg')" }}
			>
				<WalletProvider>
					<TargetChainProvider>
						<Navbar />
						<div className="max-w-[1024px] mx-auto mb-6 px-2">
							{children}
						</div>
						<div className="my-4 text-center">
							Built by{" "}
							<Link
								href="https://taopad.io"
								target="_blank"
								className="underline"
							>
								TaoPad
							</Link>
							. Powered by{" "}
							<Link
								href="https://layerzero.network/"
								target="_blank"
								className="underline"
							>
								LayerZero
							</Link>
							.
						</div>
					</TargetChainProvider>
				</WalletProvider>
			</body>
		</html>
	);
}
