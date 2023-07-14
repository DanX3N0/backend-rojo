import mongoose, { Schema, Document, Mongoose } from "mongoose";
export interface IClient extends Document {
  name: string;
  lasName: string;
  email: string;
  phone: string;
  billingAddress: string;
  shippingAddress: string;
  marketingPreference: string;
}
const clientSchema: Schema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  billingAddress: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  marketingPreference: { type: String, required: true },
});
export const ClientModel = (mongoose: Mongoose) => {
  return mongoose.model<IClient>("Client", clientSchema);
};
