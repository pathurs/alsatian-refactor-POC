import { TestResult } from '../test-result';
import { matchers } from '../expect';

export class Matcher<T> {
    public static create<T>(actualValue: T, shouldMatch: boolean) {
        return (expectedValue?: T) => {
            matchers.push(new this(actualValue, expectedValue, shouldMatch));
        };
    }

    constructor(
        public readonly actualValue: T,
        public readonly expectedValue: T | undefined,
        public readonly shouldMatch: boolean
    ) {}

    public async match(): Promise<TestResult> {
        throw new Error('Not implemented');
    }

    public async pass(reason: string = this.makeReason()): Promise<TestResult> {
        return new TestResult(true, reason);
    }

    public async fail(reason: string = this.makeReason()): Promise<TestResult> {
        return new TestResult(false, reason);
    }

    public async skip(reason: string = this.makeReason()): Promise<TestResult> {
        return new TestResult(undefined, reason);
    }

    private makeReason() {
        return `Expected ${this.actualValue} ${this.constructor.name} ${this.expectedValue}`;
    }
}

export type MatcherConstructor<T> = new (actualValue: T, expectedValue: T, shouldMatch: boolean) => Matcher<T>;
