import { RequestHandler, NextFunction, Request, Response, response } from "express";
import { BaseInjectable } from "../base.injectable";
import Product from "../db/models/product.model";
import ErrorResponse from "../lib/ErrorResponse";
import { ProductService } from "../services/product.service";

export class ProductController extends BaseInjectable {
    private productService:ProductService;
    constructor() {
        super()
        this.productService = new ProductService()
    }


    public async getProducts(req: Request, resp: Response, next: NextFunction):Promise<any> {
        try {
            const data = this.getDataAsObject();
            this.compare(data, "ProductController")
            const products =  await this.productService.getProducts(data)
            resp.status(200).json({
                success: true,
                data: products
            })
        } catch (err) {
            throw new ErrorResponse(400, `Couldn't get the products`);
        }
    }

    public async getProductById(req: Request, resp: Response, next: NextFunction) {
        try {
            const data = this.getDataAsObject();
            this.compare(data, "ProductController")
            const id:number = parseInt(req.params.id,10)
            return await this.productService.getProductById(id, data)
        } catch (err) {
            throw new ErrorResponse(400, "Could not fetch the product by " + req.params.id)
        } 
        
    }

    public async addProduct(req: Request, resp: Response, next: NextFunction) {
        const data = this.getDataAsObject();
        this.compare(data, "ProductController")
        const productData = <Product>req.body
        return await this.productService.addProduct(productData, data)
    }

    public async updateProductById(req: Request, resp: Response, next: NextFunction) {
        const data = this.getDataAsObject();
        this.compare(data, "ProductController")
        const id:number = parseInt(req.params.id,10)
        const productData:Product = <Product>req.body
        return await this.productService.updateProductById(id, productData, data)
    }


    public static asyncHandler (fn: RequestHandler) {
        return (req: Request, resp: Response, next: NextFunction) => {
            Promise.resolve(fn(req, resp, next))
            .catch((err) => console.error(err))
        }
    }


}