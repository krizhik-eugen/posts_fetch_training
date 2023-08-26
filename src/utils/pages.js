export const getPagesCount = (fetchCount, limit) => {
    return Math.ceil(fetchCount/limit)
}