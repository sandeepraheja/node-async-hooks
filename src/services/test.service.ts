import { IAppAsyncContext } from "../api.models/async.context";
import { BaseInjectable } from "../base.injectable";
import { TestRepository } from "../repositories/test.repository";
import { Logger } from "../lib/logger";

export class TestService extends BaseInjectable {

    private readonly testRepository: TestRepository;
    constructor() {
        super();
        this.testRepository = new TestRepository();
    }

    public callPromiseOnTimer(dataToTest: IAppAsyncContext): Promise<boolean> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                Logger.logToConsole(this.TenantId)
                this.compare(dataToTest);
                return this.testRepository.callPromiseOnTimer(this.getDataAsObject()).then(() => {
                    res(true);
                })
                .catch((err) => rej(err))
            }, 20);
        });
    }

    public callEmptyPromise(dataToTest: IAppAsyncContext): Promise<boolean> {
        return new Promise((res, rej) => {
            this.compare(dataToTest);
            return this.testRepository.callEmptyPromise(this.getDataAsObject()).then((resp) => {
                if (resp)
                    res(true);
                else
                    rej(false)
            });
        });
    }

    public async callOnAsyncAwait(dataToTest: IAppAsyncContext): Promise<boolean> {
        const result = await new Promise<boolean>((res, rej) => {
            setTimeout(async () => {
                this.compare(dataToTest);
                await this.testRepository.callOnAsyncAwait(this.getDataAsObject());
                res(true);
            }, 20);
        });

        return result;
    }
}