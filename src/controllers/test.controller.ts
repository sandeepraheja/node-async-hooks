import { BaseInjectable } from "../base.injectable";
import { TestService } from "../services/test.service";

export class TestController extends BaseInjectable {

    private testService: TestService;

    constructor() {
        super();
        this.testService = new TestService();
    }

    public testGet(): Promise<boolean> {
        console.log("GET REQUEST ", this.getDataAsObject())
        return this.testService.callEmptyPromise(this.getDataAsObject());
    }

    public testPost(): Promise<boolean>  {
        console.log("POST REQUEST ", this.getDataAsObject())
        return this.testService.callPromiseOnTimer(this.getDataAsObject());
    }

    public testPut() {
        return this.testService.callOnAsyncAwait(this.getDataAsObject());
    }
}