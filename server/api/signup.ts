import { api } from "../main"

interface Login {
    username :string;
    password :string;
    firstName :string;
    lastName :string;
    profileUrl :string;
    fullName :string;
    gender :string;
    emergencyContact :string;
    contactNo :string;
    address :string;
}

export const signupPasahero =async(payload:Login) =>{
    return await api.post("authenticate/signup", payload)
    .then((res)=>{ 
        return res?.data
    }).catch((e)=>{
        return e?.response?.data
    })
}