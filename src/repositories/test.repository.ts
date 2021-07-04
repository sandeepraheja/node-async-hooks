import { IAppAsyncContext } from "../api.models/async.context";
import { BaseInjectable } from "../base.injectable";

export class TestRepository extends BaseInjectable {

    constructor() {
        super();
    }

    public callPromiseOnTimer(dataToTest: IAppAsyncContext): Promise<boolean> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                this.compare(dataToTest);
                res(true);
            }, 20);
        });
    }

    public callEmptyPromise(dataToTest: IAppAsyncContext): Promise<boolean> {
        return new Promise((res, rej) => {
            this.compare(dataToTest);
            res(true);
        });
    }

    public async callOnAsyncAwait(dataToTest: IAppAsyncContext): Promise<boolean> {
        const result = await new Promise<boolean>((res, rej) => {
            setTimeout(() => {
                this.compare(dataToTest);
                res(true);
            }, 20);
        });

        return result;
    }
}