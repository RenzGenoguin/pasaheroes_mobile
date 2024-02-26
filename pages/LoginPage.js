import { KeyboardAvoidingView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import { loginPasahero } from "../server/api/login";
import Icon from 'react-native-vector-icons/Feather';

export default function LoginPage () {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({username:null, password:null})
    const [loading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(true)
    const [signUpOpen, setSignUpOpen] = useState(false)

    //function to set setter in useStates
    const stateSetter = (setter, value) => {
        setter(prev => {
            return {
                ...prev,
                ...value
            }
    })}

    //checker for input fields
    const fieldChecker = () => {
        if(!username.length){
            stateSetter(setError, {username:"Username is required"})
        }
        if(!password.length){
            stateSetter(setError, {password:"Password is required"})
        }
    }
    
    //handling api call for loginPasahero
    const _handleLogin = async () => {
        if(!username.length || !password.length){
            fieldChecker()
        }else{
            setIsLoading(true)
            const {isError, isLoggedIn, message} = await loginPasahero({username, password})
            .then(data=>{
             setIsLoading(false)
             return data
            })
            if(!isLoggedIn || isError){
             if(isError==="username"){
                 stateSetter(setError, {username:message})
             }else if(isError==="password"){
                 stateSetter(setError, {password:message})
             }
            }
            if(isLoggedIn){
             console.log("Logged in")
            }
        }
    }

    //handle change and remove error on change
    const _handleTextChange = (value,setter,field) => {
        setter(value)
        setError(prev => {
            return{
                ...prev,
                [field]:null
            }
        })
    }

    //toggle function for show password
    const _handleShowPassword = () => {
        setShowPassword(prev=>!showPassword)
    }

    return (
    <LinearGradient colors={[ '#04d4f4','#086cf4']} className="flex-1 flex justify-center items-center w-full">
        {/* <Modal 
        visible={signUpOpen}
        transparent={true}
        animationType="slide"
        // presentationStyle="pageSheet"
        onRequestClose={_toggleSignUpModal}
        > */}
                {/* <SignUpForm/> */}
        {/* </Modal> */}
        <KeyboardAvoidingView className=" w-11/12 bg-white rounded-xl p-5 py-10 flex items-center justify-center">
            <Text className=" text-4xl font-black text-sky-700">PASAHEROES</Text>
            <View className=" w-full my-3 px-4 justify-center items-center flex flex-col">
                <Text className=" flex w-full px-2 font-bold text-gray-500 pb-1">Username</Text>
                <TextInput 
                className={` border rounded-full border-gray-300 w-full px-5 py-1 ${!error.username?"border-gray-300":"border-red-300"}`}
                value={username} 
                onChangeText={(e)=>{_handleTextChange(e, setUsername, "username")}} 
                placeholder="Enter your username"/>
                <View className=" w-full flex items-end">
                    <Text className=" text-red-500 text-xs px-3">{error.username || ""}</Text>
                </View>
                <Text className=" flex w-full px-2 font-bold text-gray-500 pb-1 justify-between">Password</Text>
                <View className={` flex flex-row items-center justify-between border rounded-full border-gray-300 w-full px-5 py-1 ${!error.password?"border-gray-300":"border-red-300"}`}>
                    <TextInput 
                    className=" flex-1"
                    value={password} 
                    onChangeText={(e)=>{_handleTextChange(e, setPassword, "password")}} 
                    placeholder="Enter your password" 
                    secureTextEntry={showPassword}
                    />
                    <TouchableOpacity onPress={_handleShowPassword}>
                        <Icon name={showPassword?"eye":"eye-off"} size={16}/>
                    </TouchableOpacity>
                </View>
                <View className=" w-full flex items-end">
                    <Text className=" text-red-500 text-xs px-3">{error.password || ""}</Text>
                </View>
            </View>
            <TouchableHighlight className=" rounded-full w-5/6 overflow-hidden" onPress={_handleLogin} >
                <LinearGradient
                    className="flex justify-center items-center w-full p-2 "
                    colors={[ '#04d4f4','#086cf4']}>
                        <Text className=" text-white font-black" disabled={loading}>{"Login"}</Text>
                </LinearGradient>
            </TouchableHighlight>
            <View className=" flex justify-center w-full items-center pt-2 flex-row gap-1">
                <Text className=" text-xs">Don't have an account?</Text>
                <TouchableOpacity onPress={()=>null}>
                    <Text className=" text-xs font-bold text-sky-500">Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </LinearGradient>
    )
} 

//className=""