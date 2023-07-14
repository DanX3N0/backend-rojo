import { Express } from 'express';
import  { ClientModel, IClient } from '../routes/schemas/Client';
import { StatusCodes } from 'http-status-codes';
import App from '../app';
import { Model } from 'mongoose';
import { validateDataClient } from '../middleware/validateDataClient';
export class ClientController {
    private route: string;
    private app: App;
    private express: Express;
    private client: Model<IClient>;
    constructor(app: App, route: string) {
        this.route = route;
        // console.log('route', this.route);
        this.app = app;
        this.express = this.app.getAppServer();
        // this.user is a Model object
        this.client = ClientModel(this.app.getClientMongoose());

        this.initRoutes();
        
    }
    private initRoutes(): void {
        
        this.express.post(this.route,validateDataClient, async (req, res) => {            
            const requestObject = req.body ;
            const findClient = await this.client.findOne({email:requestObject.email})
            if(findClient){
              res.status(400).send('email already exists');
              return;
            }
            const newClient = new this.client(requestObject);
            const result = await newClient.save();
            if (result) {
                res.status(201).json(result);
                return;
            }else{
              res.status(500).json({});
              return;
            }
        });

        this.express.get(this.route, async(req, res) => {
            
            if(!req.query.cantidad){
                const result = await this.client.find()
                res.status(StatusCodes.OK).json(result);
                return;  
            }
            const cantidad = parseInt(req.query.cantidad as string, 10) || 0;

            const list =  await this.client.find().limit(cantidad);
            res.status(StatusCodes.ACCEPTED).json(list);
        });



        this.express.get(`${this.route}/:id`,async(req, res)=>{
          const { id } = req.params;
          const result = await this.client.findById(id)
          if(!result){
              res.status(404).json({msg: 'user not found'}); 
              return;   
          }
          res.status(StatusCodes.OK).json(result);
        })
    }
}