import { useContext } from "react"
import { TokenConfigContext } from "@/components/TokenConfigProvider"

export function useTokenConfig() {
    return useContext(TokenConfigContext)
}
