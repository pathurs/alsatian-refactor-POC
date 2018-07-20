import { GenericExpectation } from './generic-expectation';
import { ToResolve } from '../matchers/to-resolve';
import { matchers } from '../expect';

export class PromiseExpectation<T> extends GenericExpectation<PromiseLike<T>> {
    public toResolve(description?: string) {
        matchers.push(new ToResolve(this.actualValue, undefined, this.shouldMatch, description));
    }
}
