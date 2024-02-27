import { api } from "../main"

interface Login {
    username :string;
    password :string;
    confirmPassword: string;
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
    const {
        username,
        password,
        firstName,
        lastName,
        profileUrl,
        fullName,
        gender,
        emergencyContact,
        contactNo,
        address} = payload
    const signupData = {
        username,
        password,
        firstName,
        lastName,
        profileUrl,
        fullName,
        gender,
        emergencyContact,
        contactNo,
        address}
    return await api.post("authenticate/signup", signupData)
    .then((res)=>{ 
        return res?.data
    }).catch((e)=>{
        return e?.response?.data
    })
}