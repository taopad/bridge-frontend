export function Address({ children }: { children: `0x${string}` }) {
    return (
        <input
            type="text"
            className="bg-black text-white w-full border-0 flex-1 focus:outline-none focus:ring-0"
            value={children}
            readOnly
        />
    )
}
