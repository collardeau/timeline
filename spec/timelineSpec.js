let React = require('react');
let TestUtils = require('react/lib/ReactTestUtils');
let svgUtils = require('../app/utils/svgUtils');

describe('svgUtils', () => {

    describe('isOverlapping function', () => {

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

            res = isOverlapping([1,45,30], 5, 30);
            expect(res).toBe(true);
            res = isOverlapping([0, 1, 10, 100], 5, 10);
            expect(res).toBe(true);

        });

        it("works when newDot is within radius distance of an existing dot", () => {

            res = isOverlapping([1,45,30], 5, 34);  // when new dot is little higher
            expect(res).toBe(true);

            res = isOverlapping([1,45,30], 5, 21);  // little lower
            expect(res).toBe(true);

            res = isOverlapping([1,45,30], 10, 45); // big radius
            expect(res).toBe(true);

            res = isOverlapping([0, 10, 20, 30, 40, 100, 1000.333], 5, 60); // random numbers
            expect(res).toBe(false);

            res = isOverlapping([0, 10, 20, 30, 40, 100, 1000.333], 5, 98.5); // fraction
            expect(res).toBe(true);

        });
    });

    describe('getClosestDot()', () => {

        let getAbove = svgUtils.getAboveDot,
            res;

        it("works", function() {

            res= getAbove([1,2,5], 3);
            expect(res).toBe(1);

            res = getAbove([1,5,10], 11);
            expect(res).toBe(2);

            res = getAbove([1,5,10], 9);
            expect(res).toBe(1);

            res = getAbove([1,5,10], 2.2);
            expect(res).toBe(0);

            res = getAbove([10,50], 5);
            expect(res).toBe(-1);

            //res = getAbove([1,2,3,3], 3);
            //expect(res).toBe(3);

        })


    })
});

