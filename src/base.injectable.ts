import { IAppAsyncContext } from "./api.models/async.context";
import { AsyncResourceHelper } from "./lib/async.resource";

export class BaseInjectable {

    protected get TenantId(): number {
        const context = AsyncResourceHelper.getContext() as IAppAsyncContext;
        return context.TenantId;
    }

    protected get UserId(): number {
        const context = AsyncResourceHelper.getContext() as IAppAsyncContext;
        return context.UserId;
    }

    protected compare(data: IAppAsyncContext) {
        if (!data || data.TenantId !== this.TenantId || data.UserId !== this.UserId) {
            throw new Error(`Context doesn't match\n
            Passed Context ${JSON.stringify(data)}\n
            Inherited Context ${JSON.stringify(this.getDataAsObject())}`);
        }
    }

    protected getDataAsObject(): { TenantId: number, UserId: number } {
        return { TenantId: this.TenantId, UserId: this.UserId };
    }
}