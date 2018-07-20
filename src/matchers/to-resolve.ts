import { Matcher } from './matcher';
import { TestResult } from '../test-result';

export class ToResolve<T> extends Matcher<PromiseLike<T>> {
    public async match() {
        const status = await Promise.resolve(this.actualValue).then(() => true, () => false);

        return status ? this.pass() : this.fail();
    }
}
