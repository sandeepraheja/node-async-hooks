import async_hook from "async_hooks";
import { IAppAsyncContext } from "../api.models/async.context";

type AsyncResourceType = { [key: string]: any } | number | string | IAppAsyncContext;

export class AsyncResourceHelper {

    static ResourceContextMap = new Map<number, any>();

    public static setContext(data: AsyncResourceType) {
        const asyncId = async_hook.executionAsyncId();
        AsyncResourceHelper.ResourceContextMap.set(asyncId, data);
    }

    public static getContext(): AsyncResourceType {
        const asyncId = async_hook.executionAsyncId();
        return AsyncResourceHelper.ResourceContextMap.get(asyncId);
    }

    public static unsetContext(asyncId: number) {
        AsyncResourceHelper.unsetContext(asyncId);
    }
}