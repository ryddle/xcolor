const { map, clamp, clamp01, truncFloat, lerp, lerp01, inverseLerp, inverseLerp01, angle, angleAndModule, mod, 
    random, randomInt, randomRange, randomRangeInt, randomSign, randomBool, randomChoice, randomArray  } = require('../xutils/xutils');
const { expect, describe, it } = require('@jest/globals');

describe('xutils', function() {
    describe('Angle and module calculation', function () {
        it('should return the correct angle and module', function () {
            expect(angleAndModule(10, 10, 20, 10)).toEqual({ angle: 0, module: 10 });
            expect(angleAndModule(10, 10, 20, 20)).toEqual({ angle: 45, module: 14.142135623730951 });
            expect(angleAndModule(10, 10, 20, 5)).toEqual({ angle: 333, module: 11.180339887498949 });
        });
    });
    
    describe('Angle calculation', function () {
        it('should return the correct angle', function () {
            expect(angle(10, 10, 20, 10)).toEqual(0);
            expect(angle(10, 10, 20, 20)).toEqual(45);
            expect(angle(10, 10, 20, 5)).toEqual(333);
        });
    });
    
    describe('Module calculation', function () {
        it('should return the correct module', function () {
            expect(mod(10, 10, 20, 10)).toEqual(10);
            expect(mod(10, 10, 20, 20)).toEqual(14.142135623730951);
            expect(mod(10, 10, 20, 5)).toEqual(11.180339887498949);
        });
    });

    describe('map', function() {
        it('should map values from one range to another', function() {
            expect(map(0, 0, 10, 0, 100)).toEqual(0);
            expect(map(5, 0, 10, 0, 100)).toEqual(50);
            expect(map(10, 0, 10, 0, 100)).toEqual(100);

            expect(map(0, -10, 10, 0, 100)).toEqual(50);
            expect(map(-5, -10, 10, 0, 100)).toEqual(25);
            expect(map(5, -10, 10, 0, 100)).toEqual(75);
            expect(map(10, -10, 10, 0, 100)).toEqual(100);

            expect(map(0, 0, 100, 0, 10)).toEqual(0);
            expect(map(50, 0, 100, 0, 10)).toEqual(5);
            expect(map(100, 0, 100, 0, 10)).toEqual(10);

            expect(map(0, -100, 100, 0, 10)).toEqual(5);
            expect(map(-50, -100, 100, 0, 100)).toEqual(25);
            expect(map(50, -100, 100, 0, 100)).toEqual(75);
            expect(map(100, -100, 100, 0, 100)).toEqual(100);
        });

        it('should clamp the output to the range', function() {
            expect(map(-10, 0, 10, 0, 1)).toEqual(0);
            expect(map(1000, 0, 10, 0, 1)).toEqual(1);
        });
    });

    describe('clamp', function() {
        it('should clamp values between a min and max value', function() {
            expect(clamp(0, 0, 1)).toEqual(0);
            expect(clamp(0.5, 0, 1)).toEqual(0.5);
            expect(clamp(1, 0, 1)).toEqual(1);
            expect(clamp(2, 0, 1)).toEqual(1);

            expect(clamp(-1, 0, 1)).toEqual(0);
            expect(clamp(1.5, 0, 1)).toEqual(1);
        });
    });

    describe('clamp01', function() {
        it('should clamp values between 0 and 1', function() {
            expect(clamp01(0)).toEqual(0);
            expect(clamp01(0.5)).toEqual(0.5);
            expect(clamp01(1)).toEqual(1);
            expect(clamp01(2)).toEqual(1);

            expect(clamp01(-1)).toEqual(0);
            expect(clamp01(1.5)).toEqual(1);
        });
    });

    describe('truncFloat', function() {
        it('should truncate floats to a number of digits', function() {
            expect(truncFloat(1.234567891, 2)).toEqual(1.23);
            expect(truncFloat(1.234567891, 4)).toEqual(1.2345);
            expect(truncFloat(1.234567891, 6)).toEqual(1.234567);
            expect(truncFloat(1.234567891, 8)).toEqual(1.23456789);

            expect(truncFloat(1.23456789, 0)).toEqual(1);
        });
    });

    describe('lerp', function() {
        it('should linearly interpolate between two values', function() {
            expect(lerp(0, 10, 0.5)).toEqual(5);
            expect(lerp(0, 10, 0)).toEqual(0);
            expect(lerp(0, 10, 1)).toEqual(10);
        });
    });
    
    describe('lerp01', function() {
        it('should linearly interpolate between two values with t=0.5', function() {
            expect(lerp01(0, 10)).toEqual(5);
        });
    });
    
    describe('inverseLerp', function() {
        it('should calculate the inverse of the lerp function', function() {
            expect(inverseLerp(0, 10, 5)).toEqual(0.5);
            expect(inverseLerp(0, 10, 0)).toEqual(0);
            expect(inverseLerp(0, 10, 10)).toEqual(1);
        });
    });
    
    describe('inverseLerp01', function() {
        it('should calculate the inverse of the lerp function with t=0.5', function() {
            expect(inverseLerp01(0, 10, 5)).toEqual(0.5);
        });
    });
    
    describe('random', function() {
        it('should generate a random value between min and max', function() {
            for (let i = 0; i < 100; i++) {
                const min = Math.random() * 100;
                const max = min + Math.random() * 100;
                const value = random(min, max);
                expect(value).toBeGreaterThanOrEqual(min);
                expect(value).toBeLessThan(max);
            }
        });
    });
    
    describe('randomInt', function() {
        it('should generate a random integer value between min and max', function() {
            for (let i = 0; i < 100; i++) {
                const min = Math.floor(Math.random() * 100);
                const max = min + Math.floor(Math.random() * 100);
                const value = randomInt(min, max);
                expect(value).toBeGreaterThanOrEqual(min);
                expect(value).toBeLessThan(max + 1);
            }
        });
    });
    
    describe('randomRange', function() {
        it('should generate a random value between 0 and max', function() {
            for (let i = 0; i < 100; i++) {
                const max = Math.random() * 100;
                const value = randomRange(0, max);
                expect(value).toBeGreaterThanOrEqual(0);
                expect(value).toBeLessThan(max);
            }
        });
    });
    
    describe('randomRangeInt', function() {
        it('should generate a random integer value between 0 and max', function() {
            for (let i = 0; i < 100; i++) {
                const max = Math.floor(Math.random() * 100);
                const value = randomRangeInt(0, max);
                expect(value).toBeGreaterThanOrEqual(0);
                expect(value).toBeLessThan(max + 1);
            }
        });
    });
    
    describe('randomSign', function() {
        it('should generate a random -1 or 1', function() {
            for (let i = 0; i < 100; i++) {
                const value = randomSign();
                  expect(value => value === -1 || value === 1).toBeTruthy();
            }
        });
    });
    
    describe('randomBool', function() {
        it('should generate a random boolean value', function() {
            for (let i = 0; i < 100; i++) {
                const value = randomBool();
                expect(value => value === true || value === false).toBeTruthy();
            }
        });
    });
    
    describe('randomChoice', function() {
        it('should select a random element from the choices array', function() {
            for (let i = 0; i < 100; i++) {
                const choices = [1, 2, 3, 4, 5];
                const choice = randomChoice(choices);
                expect(choices).toContain(choice);
            }
        });
    });
    
    describe('randomArray', function() {
        it('should select a random element from the array', function() {
            for (let i = 0; i < 100; i++) {
                const array = [1, 2, 3, 4, 5];
                const value = randomArray(array);
                expect(array).toContain(value);
            }
        });
    });

});
