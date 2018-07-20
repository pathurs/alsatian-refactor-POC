import { Expectation } from './expectation';
import { ToBe } from '../matchers/to-be';
import { matchers } from '../expect';
import { Matcher } from '../matchers/matcher';

export class GenericExpectation<T> extends Expectation<T> {
    public toBe(expectedValue?: T, description?: string) {
        matchers.push(new ToBe(this.actualValue, expectedValue, this.shouldMatch, description));
    }
}
