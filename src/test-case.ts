import { matchers } from './expect';

export class TestCase {
    constructor(protected readonly test: Function) {}

    public run() {
        matchers.length = 0;

        this.test();

        return matchers.map(matcher => matcher.match());
    }
}
