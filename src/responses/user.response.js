export const success = (res, message, data) =>{
    res.send({message, data})
}