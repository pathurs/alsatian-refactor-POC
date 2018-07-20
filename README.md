# alsatian-refactor-POC

A Proof of Concept for a possible refactor of Alsatian

## Example API, obviously can easily be converted to Decorators

```
import { Runner } from './src/runner';
import { TestCase } from './src/test-case';
import { Expect } from './src/expect';

const runner = new Runner();

runner.addTest(
    new TestCase(() => {
        Expect(1).toBe(0); // Fail
        Expect(1).toBe(1); // Pass
    })
);

runner.addTest(
    new TestCase(() => {
        Expect(1).not.toBe(1); // Fail
        Expect(1).not.toBe(0); // Pass
    })
);

runner.addTest(
    new TestCase(() => {
        Expect(Promise.reject()).toResolve(); // Fail
        Expect(Promise.resolve()).toResolve(); // Pass
    })
);

runner.addTest(
    new TestCase(() => {
        Expect(Promise.resolve()).not.toResolve(); // Fail
        Expect(Promise.reject()).not.toResolve(); // Pass
    })
);

runner.run();

// Results
//
// Failed:  Expected 1 ToBe 0
// Passed:  Expected 1 ToBe 1
// Failed:  Expected 1 not ToBe 1
// Passed:  Expected 1 not ToBe 0
// Failed:  Expected [object Promise] ToResolve undefined
// Passed:  Expected [object Promise] ToResolve undefined
// Failed:  Expected [object Promise] not ToResolve undefined
// Passed:  Expected [object Promise] not ToResolve undefined
```
