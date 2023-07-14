import { productPost, productsGet,ProductGet, productPut, dlProduct } from '../services/products.servives'
import { handleHttp } from '../utils/error.handle'

const get = async({ params }:Request|any,res:Response|any) =>{
    try{
        const {id}=params
        const response = await ProductGet(id)
        const data = response? response:'NOT FOUND'
        res.send(data)
    }catch (e){
        handleHttp(res,'ERROR_GET_ITEM',e)
    }

}
const getAll = async(req:Request,res:Response|any) =>{
    try{
        const response = await productsGet()
        res.send(response)
    }catch (e){
        handleHttp(res,'ERROR_GET_ITEMS',e)
    }
}
const post = async({body}:Request | any,res:Response|any)=>{
    try{
        const response = await productPost(body)
        res.send(response)
    }catch (e){
        handleHttp(res,'ERROR_POST_ITEM',e)
    }
}
const put = async({params,body}:Request|any,res:Response|any) =>{
    try{
        const {id}=params
        const response = await productPut(id,body)
        res.send(response)
    }catch (e){
        handleHttp(res,'ERROR_UPDATE_ITEM',e)
    }
}
const deleted = async({params}:Request|any,res:Response|any) =>{
    try{
        const {id}=params
        const response = await dlProduct(id)
        res.send(response)
    }catch (e){
        handleHttp(res,'ERROR_DELETE_ITEM',e)
    }
}

export {get,getAll,post,put,deleted}