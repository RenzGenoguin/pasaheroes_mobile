import { api } from "../main"

interface PasaheroUsername {
    username:string;
}
interface PasaheroUpdate {
    id:number; 
    firstName:string;
    lastName:string;
    gender:string;
    emergencyContact:string;
    contactNo:string;
    address:string;
}

export const getPasaheroData =async(payload:PasaheroUsername) =>{
    const {username} = payload
    return await api.post("pasahero/getPasaheroData", {username})
    .then((res)=>{ 
        return res?.data
    }).catch((e)=>{
        return e?.response?.data
    })
}
export const updatePasahero =async(payload:PasaheroUpdate) =>{
    const {id, 
        firstName,
        lastName,
        gender,
        emergencyContact,
        contactNo,
        address,} = payload
    return await api.post("pasahero/updatePasahero", {id, 
        firstName,
        lastName,
        gender,
        emergencyContact,
        contactNo,
        address,})
    .then((res)=>{ 
        return res?.data
    }).catch((e)=>{
        return e?.response?.data
    })
}