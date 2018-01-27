export const SORT = 'SORT'

export function sortOn (on) {
    return {
        type: SORT,
        on,
    }
}
