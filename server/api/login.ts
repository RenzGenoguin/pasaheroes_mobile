import { api } from "../main"

interface Login {
    username:string;
    password:string;
}

export const loginPasahero =async(payload:Login) =>{
    const {username, password} = payload
    return await api.post("authenticate/login", {username, password})
    .then((res)=>{ 
        return res?.data
    }).catch((e)=>{
        return e?.response?.data
    })
}