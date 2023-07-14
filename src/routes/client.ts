import { Express } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Model } from 'mongoose';
import { validateDataClient } from './middleware/validateDataClient';
import { IClient, ClientModel } from './schemas/Client';
import { OrderModel } from './schemas/Order';

export class ClientController {
  private route: string;
  private express: Express;
  private client: Model<IClient>;

  constructor(route: string, express: Express, client: Model<IClient>) {
    this.route = route;
    this.express = express;
    this.client = client;
    this.initRoutes();
  }

  private initRoutes(): void {
    this.express.put(
      `${this.route}/:id`,
      validateDataClient,
      async (req, res) => {
        try {
          const { id } = req.params;
          const updatedData = req.body;
          const updatedClient = await this.client.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
          );
          if (!updatedClient) {
            res
              .status(StatusCodes.NOT_FOUND)
              .json({ error: 'Client not found' });
            return;
          }
          res.status(StatusCodes.OK).json(updatedClient);
        } catch (error) {
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: 'Error updating the client' });
        }
      }
    );

    this.express.delete(`${this.route}/:id`, async (req, res) => {
      try {
        const { id } = req.params;
        const deletedClient = await this.client.findByIdAndDelete(id);
        if (!deletedClient) {
          res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: 'Client not found' });
          return;
        }
        res.sendStatus(StatusCodes.NO_CONTENT);
      } catch (error) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: 'Error deleting the client' });
      }
    });

    this.express.get(`${this.route}/:id/orders`, async (req, res) => {
      try {
        const { id } = req.params;

        const client = await this.client.findById(id);

        if (!client) {
          res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: 'Client not found' });
          return;
        }

        const orders = await OrderModel.find({ clientId: id });

        res.status(StatusCodes.OK).json(orders);
      } catch (error) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: 'Error getting the order history' });
      }
    });
  }
}
