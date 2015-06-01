let React = require('react');
let TestUtils = require('react/lib/ReactTestUtils');
let svgUtils = require('../app/utils/svgUtils');

describe('svgUtils', () => {

    describe('isOverlapping', () => {

        var isOverlapping = svgUtils.isOverlapping;
        var res;

        it("works when new dot is not overlapping", () => {

            res = isOverlapping([1, 45, 30], 5, 80);
            expect(res).toBe(false);

            res = isOverlapping([1, 3, 8], 5, 19);
            expect(res).toBe(false);

            res = isOverlapping([3, 8, 75], 1, 12);
            expect(res).toBe(false);

            res = isOverlapping([], 5, 18);
            expect(res).toBe(false);

        });

        it("works when newDot is exactly same as a dot in the array", () => {

            res = isOverlapping([1, 45, 30], 5, 30);
            expect(res).toBe(true);
            res = isOverlapping([0, 1, 10, 100], 5, 10);
            expect(res).toBe(true);

        });

        it("works when newDot is within radius distance of an existing dot", () => {

            res = isOverlapping([1, 45, 30], 5, 34);  // when new dot is little higher
            expect(res).toBe(true);

            res = isOverlapping([1, 45, 30], 5, 21);  // little lower
            expect(res).toBe(true);

            res = isOverlapping([1, 45, 30], 10, 45); // big radius
            expect(res).toBe(true);

            res = isOverlapping([0, 10, 20, 30, 40, 100, 1000.333], 5, 60); // random numbers
            expect(res).toBe(false);

            res = isOverlapping([0, 10, 20, 30, 40, 100, 1000.333], 5, 98.5); // fraction
            expect(res).toBe(true);

            res = isOverlapping([10], 5, 93.22); // fraction
            expect(res).toBe(false);


        });
    });

    describe('reorderData', () => {

        var reorder = svgUtils.reorderData;
        var res;

        it("works", () => {

            let data = [{pos: 2}, {pos: 1}, {pos: 3}];
            res = reorder(data, "pos");
            expect(data).toEqual([{pos: 1}, {pos: 2}, {pos: 3}]);

            let data2 = [{pos: 45}, {pos: 11}, {pos: -3}, {post: 26.5}];
            res = reorder(data2, "pos");
            //expect(data2).toEqual([{pos: -3}, {pos: 11}, {pos: 26.5}, { pos: 45}])

        });
    });

    describe('getPrevDot()', () => {

        let getPrev = svgUtils.getPrevDot,
            res;

        it("works", () => {

            res = getPrev([ 1, 2, 5], 3);
            expect(res).toBe(1);

            res = getPrev([1, 5, 10], 11);
            expect(res).toBe(2);

            res = getPrev([1, 5 , 10], 9);
            expect(res).toBe(1);

            res = getPrev([1, 5, 10], 2.2);
            expect(res).toBe(0);

            res = getPrev([10, 50], 5);
            expect(res).toBe(-1);

            //res = getAbove([1,2,3,3], 3);
            //expect(res).toBe(3);

        });


    });

    describe('isOutBound()', () => {

        it("works", () => {
            let out = svgUtils.isOutOfScale,
                res;

            res = out([1, 5, 10], 5);
            expect(res).toBe(false);

            res = out([1, 5, 10], 15);
            expect(res).toBe(true);

            res = out([10, 15, 30], 15);
            expect(res).toBe(false);

            res = out([10, 15, 30], 5);
            expect(res).toBe(true);

            res = out([10, 15, 30], 30);
            expect(res).toBe(false);

            res = out([10, 15, 30], 10);
            expect(res).toBe(false);

        });


    });


    //describe('getTxtPos()', () => {
    //
    //    it("works", () => {
    //        let pos = svgUtils.getTxtPos,
    //            res;
    //
    //        res = out([1, 5, 10], 5);
    //        expect(res).toBe(false);
    //
    //
    //
    //    })
    //
    //
    //});
});

