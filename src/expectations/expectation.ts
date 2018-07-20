import { MatcherConstructor } from '../matchers/matcher';
import { matchers } from '../expect';

export class Expectation<T> {
    public get not() {
        this.shouldMatch = !this.shouldMatch;

        return this;
    }

    public constructor(protected readonly actualValue: T, protected shouldMatch = true) {}
}
