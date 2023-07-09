import { Express, Request, Response } from 'express';
import { authMiddleware } from '../Middleware/authMiddlewares';
import { Model } from 'mongoose';
import { IProduct, productModel } from './schemas/product';
import { StatusCodes } from 'http-status-codes';
import App from '../app';

export class ProductController {
  private route: string;
  private app: App;
  private express: Express;
  private product: Model<IProduct>;

  constructor(app: App, route: string) {
    this.route = route;
    console.log('route', this.route);
    this.app = app;
    this.express = this.app.getAppServer();
    this.product = productModel(this.app.getClientMongoose());

    this.initRoutesp();
  }

  private initRoutesp(): void {
    // Ruta protegida que requiere autenticación para obtener los productos
    this.express.get(this.route, authMiddleware, async (req: Request, res: Response) => {
      const list = await this.product.find();
      res.status(StatusCodes.ACCEPTED).json({ list });
    });

    // Ruta protegida que requiere autenticación para crear un producto
    this.express.post(this.route, authMiddleware, async (req: Request, res: Response) => {
      const requestObject = { ...req.body };
      console.log('requestObject', requestObject);
      const newProduct = new this.product(requestObject);
      const result = await newProduct.save();
      if (result) {
        res.status(StatusCodes.CREATED).json(result);
        return;
      }
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({});
    });

    // Ruta protegida que requiere autenticación para actualizar un producto
    this.express.put(`${this.route}/:id`, authMiddleware, async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, description, category, price, stock, images, weight, dimension } = req.body;
        
        const updateFields: Partial<IProduct> = {}; // Objeto para almacenar los campos a actualizar
        
        if (name !== undefined) {
          updateFields.name = name;
        }
        
        if (description !== undefined) {
          updateFields.description = description;
        }
        
        if (category !== undefined) {
          updateFields.category = category;
        }
        
        if (price !== undefined) {
          updateFields.price = price;
        }
        
        if (stock !== undefined) {
          updateFields.stock = stock;
        }
        
        if (images !== undefined) {
          updateFields.images = images;
        }
        
        if (weight !== undefined) {
          updateFields.weight = weight;
        }
        
        if (dimension !== undefined) {
          updateFields.dimension = dimension;
        }
        
        const result = await this.product.findOneAndUpdate({ _id: id }, updateFields, { new: true });
        
        res.status(StatusCodes.OK).json({ msg: result });
      });
      

    // Ruta protegida que requiere autenticación para eliminar un producto
    this.express.delete(`${this.route}/:id`, authMiddleware, async (req: Request, res: Response) => {
      const { id } = req.params;
      const result = await this.product.findOneAndDelete({ _id: id });
      res.status(StatusCodes.OK).json({ msg: result });
    });
  }
}
