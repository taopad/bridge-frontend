import { SourceTokenBalance } from "./SourceTokenBalance";
import { TargetTokenBalance } from "./TargetTokenBalance";
import { SourceChainButton } from "./SourceChainButton";
import { TargetChainSelector } from "./TargetChainSelector";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function NetworkCard() {
	return (
		<Card className="border bg-black shadow-lg rounded-lg">
			<CardHeader>
				<CardTitle>Chain selection</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-4 lg:flex-row">
					<div className="flex flex-col gap-4 flex-1 text-center">
						<SourceChainButton />
						<SourceTokenBalance />
					</div>
					<div className="flex flex-col gap-4 flex-1 text-center">
						<TargetChainSelector />
						<TargetTokenBalance />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
