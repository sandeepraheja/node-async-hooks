import { BaseInjectable } from "../base.injectable";
import { TestService } from "../services/test.service";

export class TestController extends BaseInjectable {

    private testService: TestService;

    constructor() {
        super();
        this.testService = new TestService();
    }

    public testGet() {
        return this.testService.callEmptyPromise(this.getDataAsObject());
    }

    public testPost() {
        return this.testService.callPromiseOnTimer(this.getDataAsObject());
    }

    public testPut() {
        return this.testService.callOnAsyncAwait(this.getDataAsObject());
    }
}