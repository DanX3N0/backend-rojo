import mongoose, { Schema, Document, Mongoose, Model, model}from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    category:string;
    price:string;
    stock:string;
    images:string;
    weight:string;
    dimension:string;
}
const productSchema: Schema= new Schema({
        name:{type: String,required:true},
        description: {type: String,required:true},
        category:{type:String,required:true},
        price:{type:Number,required:true},
        stock:{type:Number,required:true},
        images:{type:String,required:true},
        weight:{type:String,required:true},
        dimension:{type:String,required:true}
    },
    {
        timestamps:true,
        versionKey:false
    });

    export const productModel =(mongoose:Mongoose)=>{
        return mongoose.model<IProduct>("Products",productSchema);
      }
    