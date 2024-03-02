import { TokenSelection } from "@/components/TokenSelection"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function BridgeCard({ name, children }: { name: string, children: React.ReactNode }) {
    return (
        <Card className="card bg-black">
            <CardHeader>
                <TokenSelection name={name} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}
