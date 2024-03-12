import { api } from "../main"

interface ActiveRide {
    pasaheroId:number;
}
interface CreateActiveRide {
    pasaheroId:number;
    driverId:string
}
interface EndRide {
    rideId:number;
}

export const getActiveRide =async(payload:ActiveRide) =>{
    const {pasaheroId} = payload
    return await api.post("ride/getActiveRide", {pasaheroId})
    .then((res)=>{ 
        return res?.data
    }).catch((e)=>{
        return e?.response?.data
    })
}

export const createStartRide =async(payload:CreateActiveRide) =>{
    const {pasaheroId, driverId} = payload
    return await api.post("ride/createStartRide", {pasaheroId, driverId})
    .then((res)=>{ 
        return res?.data
    }).catch((e)=>{
        return e?.response?.data
    })
}

export const endRide =async(payload:EndRide) =>{
    const {rideId} = payload
    return await api.post("ride/endRide", {rideId})
    .then((res)=>{ 
        return res?.data
    }).catch((e)=>{
        return e?.response?.data
    })
}