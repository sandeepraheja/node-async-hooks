import express from "express";
import async_hooks from "async_hooks";
import { Logger } from "./src/lib/logger";


const app = express();

app.listen("3000", () => {
    console.log("Started Server at 3000");
});

app.use("/", (req, res) => {
    res.status(200).send("Hello World!!");
});

const hook = async_hooks.createHook({
    init(asyncId, type, triggerAsyncId) {
        writeSomething("init", `asyncId: ${asyncId}, type: "${type}", triggerAsyncId: ${triggerAsyncId}`);
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