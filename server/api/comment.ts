import { api } from "../main"

interface DriverId {
    driverId:string;
}

export const getCommentByDriver =async(payload:DriverId) =>{
    const {driverId} = payload
    return await api.post("comment/getCommentByDriver", {driverId})
    .then((res)=>{ 
        return res?.data
    }).catch((e)=>{
        return e?.response?.data
    })
}