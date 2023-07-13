import { Products } from '../schema/interfaces/products.interface'
import { ProductsModel } from '../schema/products.schema'

const productPost = async(products:Products)=>{
    const responseInsert = await ProductsModel.create(products)
    return responseInsert
}
const productsGet = async ()=>{
    const responseItem = await ProductsModel.find({})
    return responseItem
}
const ProductGet = async (id: string)=>{
    const responseItem = await ProductsModel.findOne({ _id: id})
    return responseItem
}
const productPut = async(id:string, data: Products) => {
    const responseItem = await ProductsModel.findOneAndUpdate({ _id: id}, data, {new:true})
    return responseItem
}
const dlProduct = async(id: string)=>{
    const responseItem = await ProductsModel.deleteOne({ _id: id})
    return responseItem
}
export{productPost, productsGet, ProductGet,productPut,dlProduct}