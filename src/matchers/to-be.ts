import { Matcher } from './matcher';
import { TestResult } from '../test-result';

export class ToBe<T> extends Matcher<T> {
    public async match() {
        return (await this.expectedValue) === this.actualValue ? this.pass() : this.fail();
    }
}
