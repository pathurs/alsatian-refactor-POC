import { TestCase } from './test-case';
import { TestResult } from './test-result';

export class Runner {
    testCases: TestCase[] = [];
    testResults: TestResult[] = [];

    public addTest(test: TestCase) {
        this.testCases.push(test);
    }

    public run() {
        this.testCases.forEach(testCase => {
            const resultPromises = testCase.run();

            resultPromises.forEach(resultPromise => {
                resultPromise.then(result => {
                    if (result.status === true) {
                        console.log(`Passed:  ${result.reason}`);
                    } else if (result.status === false) {
                        console.log(`Failed:  ${result.reason}`);
                    } else {
                        console.log(`Skipped: ${result.reason}`);
                    }
                });
            });
        });
    }
}
