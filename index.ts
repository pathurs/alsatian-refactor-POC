import { Runner } from './src/runner';
import { TestCase } from './src/test-case';
import { Expect } from './src/expect';

const runner = new Runner();

runner.addTest(
    new TestCase(() => {
        Expect(1).toBe(0); // Fail
        Expect(1).toBe(1); // Pass
        Expect(1).toBe(2); // Fail
    })
);

runner.addTest(
    new TestCase(() => {
        Expect(Promise.reject()).toResolve(); // Fail
        Expect(Promise.resolve()).toResolve(); // Pass
        Expect(Promise.reject()).toResolve(); // Fail
    })
);

runner.run();

// Results
//
// Failed:  Expected 1 ToBe 0
// Passed:  Expected 1 ToBe 1
// Failed:  Expected 1 ToBe 2
// Failed:  Expected [object Promise] ToResolve undefined
// Passed:  Expected [object Promise] ToResolve undefined
// Failed:  Expected [object Promise] ToResolve undefined
