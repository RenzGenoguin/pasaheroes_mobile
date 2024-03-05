import { api } from "../main"

interface DriverId {
    id:string;
}

export const getDriverData =async(payload:DriverId) =>{
    const {id} = payload
    return await api.post("driver/getDriverData", {id})
    .then((res)=>{ 
        return res?.data
    }).catch((e)=>{
        return e?.response?.data
    })
}