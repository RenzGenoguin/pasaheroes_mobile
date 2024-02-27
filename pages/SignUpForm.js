import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {  ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import { signupPasahero } from "../server/api/signup";
import useAuth from "../context/AuthContext";
import { ALERT_TYPE,  Dialog, Toast } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultData = {
    username :"",
    password :"",
    confirmPassword:"",
    firstName :"",
    lastName :"",
    profileUrl :"",
    fullName :"",
    gender :"",
    emergencyContact :"",
    contactNo :"",
    address :"",

}
const data = [
    {label:'Male', value:'Male'},
    {label:'Female', value:'Female'},
]
const SignUpForm = ({navigation}) => {  
    const {  setActiveUsername } = useAuth()
    const [formFields, setFormFields] = useState(defaultData);
    const [formFieldError, setFormFieldError] = useState(defaultData);
    const [showPassword, setShowPassword] = useState(true)
    const [loading, setIsLoading] = useState(false)

    //setter for formFieldState
    const _formFieldSetter =(field, data)=>{
        setFormFields(prev=>{
            return {
                ...prev,
                [field]:data
            }
        })
        setFormFieldError(defaultData)
    }

    //navigate to Login handler
    const _navigateToLogin = () => {
        navigation.navigate("Login")
    }

    //toggle function for show password
    const _handleShowPassword = () => {
        setShowPassword(prev=>!showPassword)
    }

    //field error checker function
    const _fieldErrorChecker = (field, message) => {
        if(!formFields[field].length){
            setFormFieldError(prev=>{
                return {
                    ...prev,
                    [field]:message
                }
            })
            // Alert.alert("Required", message)
            
        Toast.show({
            type: ALERT_TYPE.DANGER,
            textBody: message,
            // textBody: 'Successfully Logged in!',
          })
            return true
        }else {
            return false
        }
    }
    
    //error checker function
    const _checkError = () => {
        if(_fieldErrorChecker("firstName", "First name is required")){
            return true
        }else if(_fieldErrorChecker("lastName", "Last name is required")){
            return true
        }else if(_fieldErrorChecker("gender", "Gender is required")){
            return true
        }else if(_fieldErrorChecker("emergencyContact", "Emergency contact is required")){
            return true
        }else if(_fieldErrorChecker("address", "address is required")){
            return true
        }else if(_fieldErrorChecker("username", "Username is required")){
            return true
        }else if(_fieldErrorChecker("password", "Password is required")){
            return true
        }else if(formFields.password !== formFields.confirmPassword){

            //confirm password checker
            setFormFieldError(prev=>{
                return {
                    ...prev,
                    password:"Password does not match",
                    confirmPassword:"Password does not match",
                }
            })
        Toast.show({
            type: ALERT_TYPE.DANGER,
            title: "Password does not match",
            textBody: "Retry confirming password",
          })
            return true
        } else {
            return false
        }
    }

    const _asyncStorageSetter = async(username) => {
        await AsyncStorage.setItem(
           'username',
           username,
         ).then(()=>{

        Dialog.show({
           type: ALERT_TYPE.SUCCESS,
           title: 'Welcome',
           textBody: 'You have successfully signed in!',
         })
           setActiveUsername(username)
         });
         setIsLoading(false)
   }

    //handle submit signup
    const _handleSubmitSignup = async () => {
        setIsLoading(true)
        if(_checkError()){
            console.log("error")
        }else{
            const {
                message,
                isError,
                isLoggedIn,
                data,
                errorField,
              } = await signupPasahero({...formFields}).finally(()=>{
                setIsLoading(false)
              })
            if(isError && !data){
                if(errorField === "username"){
                    setFormFieldError(prev=>{
                        return {
                            ...prev,
                            [errorField]:message
                        }
                    })

                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: message,
                    textBody: "Please use another username",
                })
                } else {

                }
            }else if(data){
                _asyncStorageSetter(data.username)
            }
        }
    }

    return ( 
    <LinearGradient colors={[ '#04d4f4','#086cf4']} className=" h-full flex justify-center items-center w-full p-2">
        <ScrollView className=" bg-white rounded-2xl min-w-fit p-3 py-3 pb-5 w-full flex-none">
            <Text className=" text-2xl -mb-1 font-black text-sky-700 text-center">PASAHEROES</Text>
            <Text className=" text-sm uppercase text-sky-700 px-2 text-center font-semibold">SIGN UP</Text>
            <Text className=" text-sm text-sky-700 px-1 mt-1 font-bold mb-1">Personal Details</Text>

            <View className=" flex flex-row gap-1 mb-3">
                <View className=" flex flex-col flex-1">
                    <Text className=" flex w-full px-1 text-sky-700 text-xs mb-1">First name</Text>
                    <TextInput
                    className={` border rounded-md  w-full px-3 py-1 ${!formFieldError.firstName.length?"border-gray-400":"border-red-300"}`}
                    value={formFields.firstName} 
                    onChangeText={(e)=>{_formFieldSetter("firstName", e)} }
                    placeholder="Enter first name"/>
                </View>

                <View className=" flex flex-col flex-1">
                    <Text className=" flex w-full px-1 text-sky-700 text-xs mb-1">Last name</Text>
                    <TextInput
                    className={` border rounded-md  w-full px-3 py-1 ${!formFieldError.lastName.length?"border-gray-400":"border-red-300"}`}
                    value={formFields.lastName} 
                    onChangeText={(e)=>{_formFieldSetter("lastName", e)} }
                    placeholder="Enter last name"/>
                </View>
            </View>
            <View className=" flex flex-row gap-1 mb-3">
                <View className=" flex flex-col w-1/3">
                    <Text className=" flex w-full px-1 text-sky-700 text-xs mb-1">Gender</Text>
                    <Dropdown
                    className={` border rounded-md px-3 ${!formFieldError.gender.length?"border-gray-400":"border-red-300"}`}
                    style={{ padding:0}}
                    placeholderStyle={{ color:"gray", fontSize:13}}
                    selectedTextStyle={{ color:"black", fontSize:13}}
                    containerStyle={{borderRadius:10}}
                    data={data}
                    labelField="label"
                    valueField="value"
                    placeholder={'Select'}
                    value={formFields.gender}
                    onChange={item => {
                        _formFieldSetter("gender", item.value)
                    }}
                    />
                </View>

                <View className=" flex flex-col flex-1">
                    <Text className=" flex w-full px-1 text-sky-700 text-xs mb-1">Contact No. ( Optional )</Text>
                    <TextInput
                    className={` border rounded-md  w-full px-3 py-1 border-gray-400`}
                    value={formFields.contactNo} 
                    onChangeText={(e)=>{_formFieldSetter("contactNo", e)} }
                    placeholder="Contact number"/>
                </View>
            </View>

            <View className=" flex flex-row gap-1 mb-3">
                <View className=" flex flex-col flex-1">
                    <Text className=" flex w-full px-1 text-sky-700 text-xs mb-1">Emergency Contact No. ( Required )</Text>
                    <TextInput
                    className={` border rounded-md  w-full px-3 py-1 ${!formFieldError.emergencyContact.length?"border-gray-400":"border-red-300"}`}
                    value={formFields.emergencyContact} 
                    onChangeText={(e)=>{_formFieldSetter("emergencyContact", e)} }
                    placeholder="Emergency contact number"/>
                </View>
            </View>

            <View className=" flex flex-row gap-1">
                <View className=" flex flex-col flex-1">
                    <Text className=" flex w-full px-1 text-sky-700 text-xs mb-1">Address</Text>
                    <TextInput
                    className={` border rounded-md  w-full px-3 py-1 ${!formFieldError.address.length?"border-gray-400":"border-red-300"}`}
                    value={formFields.address} 
                    onChangeText={(e)=>{_formFieldSetter("address", e)} }
                    placeholder="Enter address"/>
                </View>
            </View>

            <Text className=" text-sm text-sky-700 px-1 font-bold mb-1 mt-3">Create Login Credentials</Text>
            <View className=" flex flex-row gap-1 mb-3">
                <View className=" flex flex-col flex-1">
                    <Text className=" flex w-full px-1 text-sky-700 text-xs mb-1">Username</Text>
                    <TextInput
                    className={` border rounded-md  w-full px-3 py-1 ${!formFieldError.username.length?"border-gray-400":"border-red-300"}`}
                    value={formFields.username} 
                    onChangeText={(e)=>{_formFieldSetter("username", e)} }
                    placeholder="Enter username"/>
                </View>
            </View>

            <View className=" flex flex-row gap-1 mb-3">
                <View className=" flex flex-col flex-1">
                    <Text className=" flex w-full px-1 text-sky-700 text-xs mb-1">Password</Text>
                    <View className={ ` flex flex-row justify-between items-center border rounded-md  w-full px-3 py-1 ${!formFieldError.password.length?"border-gray-400":"border-red-300"}`}>
                            <TextInput 
                            className=" flex-1"
                            value={formFields.password} 
                            onChangeText={(e)=>{_formFieldSetter("password", e)}} 
                            placeholder="Enter your password" 
                            secureTextEntry={showPassword}
                            />
                            <TouchableOpacity onPress={_handleShowPassword}>
                                <Icon name={showPassword?"eye":"eye-off"} size={16}/>
                            </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View className=" flex flex-row gap-1 mb-3">
                <View className=" flex flex-col flex-1">
                    <Text className=" flex w-full px-1 text-sky-700 text-xs mb-1">Confirm Password</Text>
                    <View className={ ` flex flex-row justify-between items-center border rounded-md  w-full px-3 py-1 ${!formFieldError.confirmPassword.length?"border-gray-400":"border-red-300"}`}>
                            <TextInput 
                            className=" flex-1"
                            value={formFields.confirmPassword} 
                            onChangeText={(e)=>{_formFieldSetter("confirmPassword", e)}} 
                            placeholder="Confirm your password" 
                            secureTextEntry={showPassword}
                            />
                            <TouchableOpacity onPress={_handleShowPassword}>
                                <Icon name={showPassword?"eye":"eye-off"} size={16}/>
                            </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View className={" flex flex-row items-center justify-center w-full mt-2 px-3"}>
                <TouchableOpacity onPress={_navigateToLogin} className={" flex-1 bg-white border border-gray-300 flex items-center justify-center py-2 rounded-md"}>
                    <Text className={" text-gray-600"}>Cancel</Text>
                </TouchableOpacity>

                <View className={" w-1"}></View>

                <TouchableOpacity onPress={ _handleSubmitSignup} className={" flex-1 bg-blue-600 flex items-center justify-center py-2 rounded-md"}>
                    <Text className={" text-white"}>Submit</Text>
                </TouchableOpacity>
            </View>


            <View className=" flex justify-center w-full items-center pt-4 flex-row gap-1">
                <Text className=" text-xs">Already have an account?</Text>
                <TouchableOpacity onPress={_navigateToLogin}>
                    <Text className=" text-xs font-bold text-sky-500">Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </LinearGradient> );
}
 
export default SignUpForm;