import { Expectation } from './expectation';
import { ToBe } from '../matchers/to-be';

export class GenericExpectation<T> extends Expectation<T> {
    public get toBe() {
        return ToBe.create(this.actualValue, this.shouldMatch);
    }
}
