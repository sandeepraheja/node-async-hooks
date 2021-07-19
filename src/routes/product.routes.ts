import { NextFunction, Router, Request, Response, RequestHandler } from "express"
import { ProductController } from "../controllers/product.controller"
import { AsyncResourceHelper } from "../lib/async.resource"
import ErrorResponse from "../lib/ErrorResponse"
import { ErrorHandler } from "../middlewares/error.handler"


export class ProductRoutes {

    public static getProductController() {
        return new ProductController()
    }

    public static SetRoutes(router: Router) {
        router.get('/api/v1/products', this.mwSetContext, (req: Request, res: Response, next: NextFunction) => this.handlePromise(res, next, this.getProductController().getProducts(req, res, next)), this.mwLast)
        router.get('/api/v1/products/:id', this.mwSetContext, (req: Request, res: Response, next: NextFunction) => this.handlePromise(res, next, this.getProductController().getProductById(req, res, next)))
        router.post('/api/v1/products', this.mwSetContext, (req: Request, res: Response, next: NextFunction) => this.handlePromise(res, next, this.getProductController().addProduct(req, res, next)))
        router.put('/api/v1/products/:id', this.mwSetContext, (req: Request, res: Response, next: NextFunction) => this.handlePromise(res, next, this.getProductController().updateProductById(req, res, next)))
    }

    public static handlePromise(response: Response, next: NextFunction, promise: Promise<any>) {
        return promise.then((res) => response.status(200).send(res))
        .catch(next)
    }

    public static mwSetContext(req: Request, res: Response, next: NextFunction) {
        AsyncResourceHelper.setContext({ UserId: req.header("user"), TenantId: req.header("tenant") });
        next()
    }

    public static mwLast(err:ErrorResponse, req: Request, res: Response, next: NextFunction) {
        ErrorHandler.errorHandler(err, req, res)
    }
}