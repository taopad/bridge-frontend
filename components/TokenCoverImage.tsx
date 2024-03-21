"use client"

import Image from "next/image"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

export function TokenCoverImage({ url }: { url: string }) {
    return (
        <AspectRatio ratio={16 / 4}>
            <AspectRatio ratio={16 / 4}>
                <Image src={url} alt="token cover" fill priority={true} />
            </AspectRatio>
        </AspectRatio>
    )
}
