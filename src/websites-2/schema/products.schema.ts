import { Schema,model } from 'mongoose';
import { Products } from './interfaces/products.interface';

const ProductsSchema = new Schema<Products>(
    {
        nombre:{
            type: String,
            required:true
        },
        descripcion: {
            type: String,
            required:true
        },
        categoria:{
            type:String,
            required:true
        },
        precio:{
            type:Number,
            required:true
        },
        cantidad_stock:{
            type:Number,
            required:true
        },
        images:{
            type:String,
            required:true
        },
        peso:{
            type:String,
            required:true
        },
        dimension:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
);

const ProductsModel = model('products',ProductsSchema);
export {ProductsModel};