export function formatAmount(str: string) {
    const n = parseFloat(str)

    if (n == 0) {
        return 0
    }

    if (n >= 100000) {
        return n.toFixed(0)
    }

    if (n >= 10000) {
        return n.toFixed(1)
    }

    if (n >= 1000) {
        return n.toFixed(2)
    }

    if (n >= 100) {
        return n.toFixed(3)
    }

    if (n >= 10) {
        return n.toFixed(4)
    }

    return n.toFixed(5)
}
