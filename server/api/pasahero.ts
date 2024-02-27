import { api } from "../main"

interface PasaheroUsername {
    username:string;
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