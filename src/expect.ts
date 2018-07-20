import { Matcher } from './matchers/matcher';
import { GenericExpectation } from './expectations/generic-expectation';
import { PromiseExpectation } from './expectations/promise-expectation';

export const matchers: Matcher<any>[] = [];

export function Expect<T>(actualValue: PromiseLike<T>): PromiseExpectation<T>;
export function Expect<T>(actualValue: T): GenericExpectation<T>;
export function Expect<T>(actualValue: any): GenericExpectation<T> {
    if (actualValue != null) {
        if (typeof actualValue.then === 'function') {
            return new PromiseExpectation(actualValue);
        }
    }

    return new GenericExpectation(actualValue);
}
