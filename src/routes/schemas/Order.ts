import { Schema, Document, model } from "mongoose";

export interface IOrder extends Document {
  orderId: string;
  date: Date;
  status: string;
  products: string[];
  totalPrice: number;
}

const orderSchema = new Schema<IOrder>({
  orderId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  products: {
    type: [String],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

export const OrderModel = model<IOrder>("Order", orderSchema);
