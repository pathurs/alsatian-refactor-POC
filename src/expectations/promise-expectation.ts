import { GenericExpectation } from './generic-expectation';
import { ToResolve } from '../matchers/to-resolve';

export class PromiseExpectation<T> extends GenericExpectation<T> {
    public get toResolve() {
        return ToResolve.create(this.actualValue, this.shouldMatch);
    }
}
