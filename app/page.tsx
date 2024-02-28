import { BridgeCard } from "@/components/BridgeCard/BridgeCard";
import { ComingSoon } from "@/components/ComingSoon";
import { NetworkCard } from "@/components/NetworkCard/NetworkCard";
import { TokenAddress } from "@/components/NetworkCard/TokenAddress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
	return (
		<main className="max-w-[700px] w-full mx-auto">
			<Tabs defaultValue="account" className="w-[700px]">
				<TabsList className="w-full grid grid-cols-3">
					<TabsTrigger value="wtao">wTao</TabsTrigger>
					<TabsTrigger value="tbank">taoBank</TabsTrigger>
					<TabsTrigger value="taousd">taoUsd</TabsTrigger>
				</TabsList>
				<TabsContent value="wtao">
					<div className="flex flex-col gap-4">
						<NetworkCard />
						<BridgeCard />
						<TokenAddress />
					</div>
				</TabsContent>
				<TabsContent value="tbank">
					<ComingSoon />
				</TabsContent>
				<TabsContent value="taousd">
					<ComingSoon />
				</TabsContent>
			</Tabs>
		</main>
	);
}
