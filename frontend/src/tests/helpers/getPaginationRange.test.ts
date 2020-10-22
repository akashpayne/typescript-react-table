import getPaginationRange from "../../helpers/getPaginationRange";

describe("get Pagination Range", () => {
    const runner = test.each([
        [1, [1, 2, 3, -1, 20]],
        [2, [1, 2, 3, 4, -1, 20]],
        [3, [1, 2, 3, 4, 5, -1, 20]],
        [4, [1, 2, 3, 4, 5, 6, -1, 20]],
        [5, [1, 2, 3, 4, 5, 6, 7, -1, 20]],
        [6, [1, -1, 4, 5, 6, 7, 8, -1, 20]],
        [7, [1, -1, 5, 6, 7, 8, 9, -1, 20]],
        [8, [1, -1, 6, 7, 8, 9, 10, -1, 20]],
        [9, [1, -1, 7, 8, 9, 10, 11, -1, 20]],
        [10, [1, -1, 8, 9, 10, 11, 12, -1, 20]],
        [11, [1, -1, 9, 10, 11, 12, 13, -1, 20]],
        [12, [1, -1, 10, 11, 12, 13, 14, -1, 20]],
        [13, [1, -1, 11, 12, 13, 14, 15, -1, 20]],
        [14, [1, -1, 12, 13, 14, 15, 16, -1, 20]],
        [15, [1, -1, 13, 14, 15, 16, 17, -1, 20]],
        [16, [1, -1, 14, 15, 16, 17, 18, 19, 20]],
        [17, [1, -1, 15, 16, 17, 18, 19, 20]],
        [18, [1, -1, 16, 17, 18, 19, 20]],
        [19, [1, -1, 17, 18, 19, 20]],
        [20, [1, -1, 18, 19, 20]],
    ])

    runner('pagination(%i, 20)', (index: number, expected: any) => {
        expect(getPaginationRange({current: index, total: 20})).toStrictEqual(expected)
    })

    it("should have good performance", () => {
        const t0 = performance.now()
        getPaginationRange({ current: 1, total: 9999})
        const t1 = performance.now()

        expect(t1 - t0).toBeLessThan(1)
    })
})