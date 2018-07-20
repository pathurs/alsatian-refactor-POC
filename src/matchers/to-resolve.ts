import { Matcher } from './matcher';
import { matchers } from '../expect';

export class ToResolve<T> extends Matcher<PromiseLike<T>> {
    public async match() {
        const status = await this.actualValue.then(() => true, () => false);

        return status ? this.pass() : this.fail();
    }
}
