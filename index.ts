import { Runner } from './src/runner';
import { TestCase } from './src/test-case';
import { Expect } from './src/expect';
import { setImmediate } from 'timers';

const runner = new Runner();

runner.addTest(
    new TestCase(() => {
        Expect(1).toBe(0, '1 === 0'); // Fail
        Expect(1).toBe(1, '1 === 1'); // Pass
    })
);

runner.addTest(
    new TestCase(() => {
        Expect(1).not.toBe(1, '1 !== 1'); // Fail
        Expect(1).not.toBe(0, '1 !== 0'); // Pass
    })
);

runner.addTest(
    new TestCase(() => {
        Expect(Promise.reject()).toResolve('reject should resolve'); // Fail
        Expect(Promise.resolve()).toResolve('resolve should resolve'); // Pass
    })
);

runner.addTest(
    new TestCase(() => {
        Expect(Promise.resolve()).not.toResolve('resolve should not resolve'); // Fail
        Expect(Promise.reject()).not.toResolve('reject should not resolve'); // Pass
    })
);

runner.addTest(
    new TestCase(() => {
        Expect(
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject();
                }, 100);
            })
        ).toResolve('reject after 100 milliseconds should resolve'); // Fail
        Expect(
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 20);
            })
        ).toResolve('resolve after 20 milliseconds should resolve'); // Pass
    })
);

runner.addTest(
    new TestCase(() => {
        Expect(
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject();
                }, 10);
            })
        ).toResolve('reject after 10 milliseconds should resolve'); // Fail
        Expect(
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 2);
            })
        ).toResolve('resolve after 2 milliseconds should resolve'); // Pass
    })
);

runner.run();

// Results
//
// Failed:  Expected 1 ToBe 0.Description: 1 === 0
// Passed:  Expected 1 ToBe 1.Description: 1 === 1
// Failed:  Expected 1 not ToBe 1.Description: 1 !== 1
// Passed:  Expected 1 not ToBe 0.Description: 1 !== 0
// Failed:  Expected [object Promise] ToResolve undefined.Description: reject should resolve
// Passed:  Expected [object Promise] ToResolve undefined.Description: resolve should resolve
// Failed:  Expected [object Promise] not ToResolve undefined.Description: resolve should not resolve
// Passed:  Expected [object Promise] not ToResolve undefined.Description: reject should not resolve
// Passed:  Expected [object Promise] ToResolve undefined.Description: resolve after 2 milliseconds should resolve
// Failed:  Expected [object Promise] ToResolve undefined.Description: reject after 10 milliseconds should resolve
// Passed:  Expected [object Promise] ToResolve undefined.Description: resolve after 20 milliseconds should resolve
// Failed:  Expected [object Promise] ToResolve undefined.Description: reject after 100 milliseconds should resolve
