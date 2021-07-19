import express, { Router } from "express";
import 'reflect-metadata'
import async_hooks from "async_hooks";
import { Logger } from "./src/lib/logger";
import db from './src/db'
import { AsyncResourceHelper } from "./src/lib/async.resource";
import { TestRoutes } from "./src/routes/test.routes";
import { ProductRoutes } from "./src/routes/product.routes";
import { ErrorHandler } from './src/middlewares/error.handler'

const sequelize = db()

sequelize.authenticate()
.then(() => {
    const app = express();

    app.use(express.json())

    app.listen("3000", () => {
        console.log("Started Server at 3000");
    });

    const router = Router();
    TestRoutes.SetRoutes(router);
    ProductRoutes.SetRoutes(router);
    app.use(router);
    app.use(ErrorHandler.errorHandler)
})
.catch(() => {
    console.error('Could not connect with db')
})



const hook = async_hooks.createHook({
    init(asyncId, type, triggerAsyncId) {
        writeSomething("init", `asyncId: ${asyncId}, type: "${type}", triggerAsyncId: ${triggerAsyncId}`);
        const data = AsyncResourceHelper.getContext(triggerAsyncId);
        if (data) {
            AsyncResourceHelper.setContext(data, asyncId);
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

