//FizzBuzz.test.ts
/// <reference types="jest" />

// This file is just an example for using Jest

import { fizzBuzz } from '../src/fizzBuzz';

test('FizzBuzz test', () => {
    expect(fizzBuzz(2)).toBe('1 2 ');
    expect(fizzBuzz(3)).toBe('1 2 Fizz ');
});
