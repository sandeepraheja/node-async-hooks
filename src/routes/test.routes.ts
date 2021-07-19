import { Router, Request, Response, NextFunction } from "express";
import { TestController } from "../controllers/test.controller";
import { AsyncResourceHelper } from "../lib/async.resource";

export class TestRoutes {

    public static SetRoutes(router: Router) {

        router.get("/test", this.mwSetContext, (req, res: Response) => {
            return this.handlePromise(res, this.getTestController().testGet());
        });

        router.post("/test", this.mwSetContext, (req, res: Response) => {
            this.handlePromise(res, this.getTestController().testPost());
        })

    }

    public static getTestController() {
        return new TestController();
    }

    public static handlePromise(res: Response, promise: Promise<boolean>) {
        
        return promise.then(() => {
            res.status(200).send({ message: "success" });
        }).catch((err) => {
            res.status(400).send({ error: err });
        });
    }

    public static mwSetContext(req: Request, res: Response, next: NextFunction) {
        AsyncResourceHelper.setContext({ UserId: req.header("user"), TenantId: req.header("tenant") });
        next()
    }

}