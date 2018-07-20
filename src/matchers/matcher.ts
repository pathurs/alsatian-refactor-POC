import { TestResult } from '../test-result';
import { matchers } from '../expect';

export abstract class Matcher<T> {
    constructor(
        public readonly actualValue: T,
        public readonly expectedValue: T | undefined,
        public readonly shouldMatch: boolean,
        public readonly description?: string
    ) {}

    public async match(): Promise<TestResult> {
        throw new Error('Not implemented');
    }

    public async pass(reason: string = this.makeReason()): Promise<TestResult> {
        return this.makeResult(true, reason);
    }

    public async fail(reason: string = this.makeReason()): Promise<TestResult> {
        return this.makeResult(false, reason);
    }

    public async skip(reason: string = this.makeReason()): Promise<TestResult> {
        return this.makeResult(undefined, reason);
    }

    private async makeResult(status: boolean | undefined, reason: string) {
        return new TestResult(status === undefined ? undefined : status === this.shouldMatch, reason);
    }

    private makeReason() {
        return `Expected ${this.actualValue} ${this.shouldMatch ? '' : 'not '}${this.constructor.name} ${
            this.expectedValue
        }.${this.description ? `Description: ${this.description}` : ''}`;
    }
}

export type MatcherConstructor<T> = new (actualValue: T, expectedValue: T, shouldMatch: boolean) => Matcher<T>;
