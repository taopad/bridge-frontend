import { getTokenContract } from "@/config/contracts";
import { Card, CardContent, CardHeader } from "../ui/card";
import { info } from "@/config/chains";

export function TokenAddress() {
	return (
		<Card className="bg-black">
			<CardHeader>wTao token addresses:</CardHeader>
			<CardContent>
				<div className="flex gap-4">
					<div className="w-[100px] text-left">{info[1].name}:</div>
					<input
						type="text"
						className="bg-black text-white w-full border-0 flex-1 focus:outline-none focus:ring-0"
						value={getTokenContract(1).address}
						readOnly
					/>
				</div>
				<div className="flex gap-4">
					<div className="w-[100px] text-left">
						{info[42161].name}:
					</div>
					<input
						type="text"
						className="bg-black text-white w-full border-0 flex-1 focus:outline-none focus:ring-0"
						value={getTokenContract(42161).address}
						readOnly
					/>
				</div>
			</CardContent>
		</Card>
	);
}
