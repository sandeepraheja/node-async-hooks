import express, { Router } from "express";
import async_hooks from "async_hooks";
import { Logger } from "./src/lib/logger";
import { AsyncResourceHelper } from "./src/lib/async.resource";
import { TestRoutes } from "./src/routes/test.routes";


const app = express();

app.listen("3000", () => {
    console.log("Started Server at 3000");
});

const router = Router();
TestRoutes.SetRoutes(router);
app.use(router);

const hook = async_hooks.createHook({
    init(asyncId, type, triggerAsyncId) {
        writeSomething("init", `asyncId: ${asyncId}, type: "${type}", triggerAsyncId: ${triggerAsyncId}`);
        const data = AsyncResourceHelper.getContext(triggerAsyncId);
        if (data) {
            AsyncResourceHelper.setContext(data);
        }
    },
    destroy(asyncId) {
        writeSomething("Destroyed", ` Async Id - ${asyncId}`);
    },
});
hook.enable();


const writeSomething = (phase: any, more: any) => {
    Logger.logToConsole(
        `Phase: "${phase}", Exec. Id: ${async_hooks.executionAsyncId()} ${more ? ", " + more : ""}`
    );
};