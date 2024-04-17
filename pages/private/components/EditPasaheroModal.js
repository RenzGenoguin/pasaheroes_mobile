import { useEffect, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ALERT_TYPE,  Dialog, Toast } from 'react-native-alert-notification';
import { Dropdown } from 'react-native-element-dropdown';
import useAuth from "../../../context/AuthContext";
import { updatePasahero } from "../../../server/api/pasahero";
const defaultData = {
    emergencyContact :"",
    contactNo :"",
    address :"",
    firstName :"",
    lastName :"",
    gender :"",

}
const data = [
    {label:'Male', value:'Male'},
    {label:'Female', value:'Female'},
]
const EditPasaheroModal = ({openEdit, setOpenEdit}) => {
    const { userData, _getPasaheroData, _isLoggedIn  } = useAuth()
    const [formFields, setFormFields] = useState(defaultData);
    const [formFieldError, setFormFieldError] = useState(defaultData);
    const [loading, setIsLoading] = useState(false)
    const _closeModal=()=>{
        setOpenEdit(false)
    }
    const _handleUpdate = async() => {
        setIsLoading(true)
        if(_checkError()){
            console.log("error")
        }else{
            await updatePasahero({...formFields, id: userData.pasahero.id})
            .then(async()=>{
                _isLoggedIn()
                .then(async(username)=>{
                _getPasaheroData(username)
                setIsLoading(false)
                })
            }).finally(()=>{
                setIsLoading(false);
                setOpenEdit(false)
            })
        }
    }   //setter for formFieldState
    const _formFieldSetter =(field, data)=>{
        setFormFields(prev=>{
            return {
                ...prev,
                [field]:data
            }
        })
        setFormFieldError(defaultData)
    }
    useEffect(()=>{
        setFormFields({
            firstName:userData.pasahero.firstName,
            lastName:userData.pasahero.lastName,
            gender:userData.pasahero.gender,
            contactNo:userData.pasahero.contactNo,
            emergencyContact:userData.pasahero.emergencyContact,
            address:userData.pasahero.address,
        })
    }, [userData])
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
            } else {
                return false
            }
        }
    return ( 

    <Modal
    animationType="slide"
    transparent={true}
    visible={openEdit}
    onRequestClose={() => {
        setOpenEdit(!openEdit);
    }}>
    <View className="flex items-center justify-center w-full h-full p-4 " style={{ backgroundColor:'rgba(0,0,0,0.5)'}}>
        <View className="p-4 bg-white rounded-md ">
            <Text className="pb-1 text-lg font-extrabold ">Update user details</Text>
            <View className="flex flex-col w-full gap-2 r">

            <View className="flex flex-col ">
                    <Text className="flex w-full px-1 mb-1 text-xs text-sky-700">First name</Text>
                    <TextInput
                    className={` border rounded-md  w-full px-3 py-1 ${!formFieldError.firstName.length?"border-gray-400":"border-red-300"}`}
                    value={formFields.firstName} 
                    onChangeText={(e)=>{_formFieldSetter("firstName", e)} }
                    placeholder="Enter first name"/>
                </View>

                <View className="flex flex-col">
                    <Text className="flex w-full px-1 mb-1 text-xs text-sky-700">Last name</Text>
                    <TextInput
                    className={` border rounded-md  w-full px-3 py-1 ${!formFieldError.lastName.length?"border-gray-400":"border-red-300"}`}
                    value={formFields.lastName} 
                    onChangeText={(e)=>{_formFieldSetter("lastName", e)} }
                    placeholder="Enter last name"/>
                </View>
                <View className="flex flex-col">
                    <Text className="flex w-full px-1 mb-1 text-xs text-sky-700">Gender</Text>
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
                <View className="flex flex-col ">
                    <Text className="flex w-full px-1 mb-1 text-xs text-sky-700">Contact No. ( Optional )</Text>
                    <TextInput
                    className={` border rounded-md  w-full px-3 py-1 border-gray-400`}
                    value={formFields.contactNo} 
                    onChangeText={(e)=>{_formFieldSetter("contactNo", e)} }
                    placeholder="Contact number"/>
                </View>

                    <View className="flex flex-col">
                        <Text className="flex w-full px-1 mb-1 text-xs text-sky-700">Emergency Contact No. ( Required )</Text>
                        <TextInput
                        className={` border rounded-md  w-full px-3 py-1 ${!formFieldError.emergencyContact.length?"border-gray-400":"border-red-300"}`}
                        value={formFields.emergencyContact} 
                        onChangeText={(e)=>{_formFieldSetter("emergencyContact", e)} }
                        placeholder="Emergency contact number"/>
                    </View>

                    <View className="flex flex-col">
                        <Text className="flex w-full px-1 mb-1 text-xs text-sky-700">Address</Text>
                        <TextInput
                        className={` border rounded-md  w-full px-3 py-1 ${!formFieldError.address.length?"border-gray-400":"border-red-300"}`}
                        value={formFields.address} 
                        onChangeText={(e)=>{_formFieldSetter("address", e)} }
                        placeholder="Enter address"/>
                    </View>


                    <View className={" flex flex-row items-center justify-center w-full mt-5 px-3"}>
                        <TouchableOpacity onPress={_closeModal} className={" flex-1 bg-white border border-gray-300 flex items-center justify-center py-2 rounded-md"}>
                            <Text className={" text-gray-600"}>Cancel</Text>
                        </TouchableOpacity>

                        <View className={" w-1"}></View>

                        <TouchableOpacity onPress={ _handleUpdate} className={" flex-1 bg-blue-600 flex items-center justify-center py-2 rounded-md"}>
                            <Text className={" text-white"}>{loading?"Loading...":"Submit"}</Text>
                        </TouchableOpacity>
                    </View>
            </View>
                
        </View>
    </View>
    </Modal>
     );
}
 
export default EditPasaheroModal;