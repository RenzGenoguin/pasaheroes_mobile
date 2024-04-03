import { api } from "../main"

interface DriverId {
    driverId:string;
}

interface RateAndComment {
    rideId:number;
    driverId:string;
    pasaheroId:number;
    rating:number;
    comment:number;
    ratingId:number | null | undefined;
    commentId:number | null | undefined;
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

export const rateAndComment =async(payload:RateAndComment) =>{
    return await api.post("comment/rateAndComment", payload)
    .then((res)=>{ 
        return res?.data
    }).catch((e)=>{
        return e?.response?.data
    })
}