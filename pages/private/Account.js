import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo  from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../../context/AuthContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditPasaheroModal from "./components/EditPasaheroModal";

const Account = () => {
    const [openEdit, setOpenEdit] = useState(false)
    const { userData, setActiveUsername, setUserData } = useAuth()

    const _logout = async() => {
        await AsyncStorage.removeItem('activeUsername').then(()=>{
            setActiveUsername(null)
            setUserData(null)
        })
        }

    return !!userData?.pasahero?( 
    <View className="bg-white py-0.5 flex-1 flex flex-col">
        <EditPasaheroModal openEdit={openEdit} setOpenEdit={setOpenEdit}/>
        <View className="bg-white px-4 py-4 flex items-center justify-center h-32 flex-col mb-0.5">
            <View className="w-32 h-32 border-4 border-gray-300 rounded-full ">
            {userData?.pasahero?.profileUrl? 
            <Image
            className="w-full h-full rounded-full "
            source={{
            uri: userData.pasahero.profileUrl
            }}
            />
            :
            <Image
            className="w-full h-full rounded-full "
            source={require("../../assets/emptyProfile.png")}
            />}
            </View>
        </View>
            <View className="flex flex-col items-center justify-center ">
                <Text className="text-2xl font-black text-gray-700 ">{userData.pasahero.fullName}</Text>
                <Text>@{userData.pasahero.username}</Text>
            </View>
        <View className="bg-white px-6 py-4 flex flex-1 justify-between h-full flex-col mb-0.5">
            <View className="flex flex-col w-full " >
                <View className="flex flex-row justify-between w-full ">
                    <Text className="mb-2 text-sm font-black text-gray-600 ">Personal Info</Text>
                    <TouchableOpacity onPress={()=>setOpenEdit(true)} className="flex flex-row items-center justify-center mb-1">
                        <Ionicons name="create" color="orange" size={18}/>
        <Text className="text-xs text-orange-500 ">Edit</Text>
                    </TouchableOpacity>
                </View>

            <View className="flex flex-col w-full overflow-hidden bg-gray-100 rounded-3xl">
                <View className="flex flex-row justify-between px-4 py-4">
                    <View className="flex flex-row items-center">
                        <MaterialCommunityIcons name="gender-male-female" color="#2ba7b5" size={23}/>
                        <Text className="ml-2 text-xs font-semibold text-gray-500 ">Gender</Text>
                    </View>
                    <View className="flex flex-row items-center">
                        <Text className="text-xs font-bold text-gray-600 ">{userData.pasahero.gender}</Text>
                    </View>
                </View>
                <View className=" h-0.5 bg-white w-full"/>
                <View className="flex flex-row justify-between px-4 py-4">
                    <View className="flex flex-row items-center">
                        <MaterialCommunityIcons name="phone" color="#2ba7b5" size={23}/>
                        <Text className="ml-2 text-xs font-semibold text-gray-500 ">Contact</Text>
                    </View>
                    <View className="flex flex-row items-center">
                        <Text className="text-xs font-bold text-gray-600 ">{userData.pasahero.contactNo}</Text>
                    </View>
                </View>
                <View className=" h-0.5 bg-white w-full"/>
                <View className="flex flex-row justify-between px-4 py-4">
                    <View className="flex flex-row items-center">
                        <MaterialCommunityIcons name="phone" color="#2ba7b5" size={23}/>
                        <Text className="ml-2 text-xs font-semibold text-gray-500 ">Emergency Contact</Text>
                    </View>
                    <View className="flex flex-row items-center">
                        <Text className="text-xs font-bold text-gray-600 ">{userData.pasahero.emergencyContact}</Text>
                    </View>
                </View>
                <View className=" h-0.5 bg-white w-full"/>
                <View className="flex flex-row justify-between px-4 py-4">
                    <View className="flex flex-row items-center">
                        <Entypo name="location" color="#2ba7b5" size={23}/>
                        <Text className="ml-2 text-xs font-semibold text-gray-500 ">Address</Text>
                    </View>
                    <View className="flex flex-row items-center">
                        <Text className="text-xs font-bold text-gray-600 ">{userData.pasahero.address}</Text>
                    </View>
                </View>
            </View>

            </View>
    <TouchableOpacity onPress={_logout} className="flex flex-row items-center justify-center px-10 py-1 mx-16 mb-10 text-red-500 border border-red-500 border-solid rounded-full ">
        <Text className="mr-2 text-xs text-red-500 ">Logout</Text>
        <Ionicons name="log-out-outline" color="red" size={18}/>
    </TouchableOpacity>
        </View>
    </View> 
    ):
    <View>
    <TouchableOpacity onPress={_logout} className="flex flex-row items-center justify-center px-10 py-1 mx-16 mb-10 text-red-500 border border-red-500 border-solid rounded-full ">
        <Text className="mr-2 text-xs text-red-500 ">Logout</Text>
        <Ionicons name="log-out-outline" color="red" size={18}/>
    </TouchableOpacity></View>;
}
 
export default Account;