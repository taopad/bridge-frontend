import { SourceChainName } from "@/components/SourceChainName"
import { TargetChainName } from "@/components/TargetChainName"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function BridgeCard({ name, children }: { name: string, children: React.ReactNode }) {
    return (
        <Card className="card bg-black">
            <CardHeader>
                <div className="flex gap-2">
                    Bridge {name} from <SourceChainName /> to <TargetChainName />
                </div>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}
