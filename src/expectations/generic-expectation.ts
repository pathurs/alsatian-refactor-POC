import { Expectation } from './expectation';
import { ToBe } from '../matchers/to-be';

export class GenericExpectation<T> extends Expectation<T> {
    public toBe = ToBe.create(this.actualValue, this.shouldMatch);
}
