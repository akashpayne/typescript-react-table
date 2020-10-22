// max items in pagination i.e. first, ..., prev, current, next, ..., last
// const MINIMAL_PAGE_ITEM_COUNT = 7;

/**
 * Generate numeric page items around current page.
 *   - Always include first and last page
 *   - Add ellipsis if needed
 */
// function generatePageItems(total: number, current: number, width: number) {
//     if (width < MINIMAL_PAGE_ITEM_COUNT) {
//         throw new Error(`Must allow at least ${MINIMAL_PAGE_ITEM_COUNT} page items`);
//     }
//     if (width % 2 === 0) {
//         throw new Error(`Must allow odd number of page items`);
//     }
//     if (total < width) {
//         return [...new Array(total).keys()];
//     }
//     const left = Math.max(0, Math.min(total - width, current - Math.floor(width / 2)));
//     const items: (string | number)[] = new Array(width);
//     for (let i = 0; i < width; i += 1) {
//         items[i] = i + left;
//     }
//     // replace non-ending items with placeholders
//     if (items[0] > 0) {
//         items[0] = 0;
//         items[1] = 'prev-more';
//     }
//     if (items[items.length - 1] < total - 1) {
//         items[items.length - 1] = total - 1;
//         items[items.length - 2] = 'next-more';
//     }
//     return items;
// }

export interface PaginationRangeInterface {
    current: number;
    total: number;
    // width: number;
}

// [{current}, [1,2,3,...,20]]
const getPaginationRange = (props: PaginationRangeInterface) => {
    const center = [
        props.current - 2,
        props.current - 1,
        props.current,
        props.current + 1,
        props.current + 2
    ],
        filteredCenter = center.filter(p => p > 1 && p < props.total),
        includeThreeLeft = props.current === 5,
        includeThreeRight = props.current === props.total - 4,
        includeLeftDots = props.current > 5,
        includeRightDots = props.current < props.total - 4;

    if (includeThreeLeft) filteredCenter.unshift(2);
    if (includeThreeRight) filteredCenter.push(props.total - 1);

    if (includeLeftDots) filteredCenter.unshift(-1);
    if (includeRightDots) filteredCenter.push(-1);

    return [1, ...filteredCenter, props.total];
};

export default getPaginationRange;
