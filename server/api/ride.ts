import { api } from "../main"

interface ActiveRide {
    pasaheroId:number;
}
interface CreateActiveRide {
    pasaheroId:number;
    driverId:string;
    startLat:number;
    startLong:number;
}
interface RideId {
    rideId:number;
    endLat:number;
    endLong:number;
}
interface PasaheroId {
    pasaheroId:number;
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
    return await api.post("ride/createStartRide", {...payload})
    .then((res)=>{ 
        return res?.data
    }).catch((e)=>{
        return e?.response?.data
    })
}

export const endRide =async(payload:RideId) =>{
    return await api.post("ride/endRide", {...payload})
    .then((res)=>{ 
        return res?.data
    }).catch((e)=>{
        return e?.response?.data
    })
}

export const getRidesByPasahero =async(payload:PasaheroId) =>{
    const {pasaheroId} = payload
    return await api.post("ride/getRidesByPasahero", {pasaheroId})
    .then((res)=>{ 
        return res?.data
    }).catch((e)=>{
        return e?.response?.data
    })
}