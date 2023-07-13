
const handleHttp = (res:Response|any, error: string, errorRaw?:any)=>{
    console.log(errorRaw)
    res.status(500)
    res.send({error})
}
export { handleHttp}