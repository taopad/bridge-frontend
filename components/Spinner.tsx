import { ReloadIcon } from "@radix-ui/react-icons"

export function Spinner({ loading = true }: { loading?: boolean }) {
    if (loading) {
        return <ReloadIcon className="h-4 w-4 animate-spin" />
    }

    return null
}
