import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../../context/AuthContext";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Account = () => {
    const { userData, setActiveUsername, setUserData } = useAuth()

    const _logout = async() => {
        await AsyncStorage.removeItem('activeUsername').then(()=>{
            setActiveUsername(null)
            setUserData(null)
        })
        }

    return !!userData?.pasahero?( 
    <View className="bg-gray-100 py-0.5 flex-1 flex flex-col">
        <View className="bg-white px-4 py-4 flex h-32 flex-row mb-0.5">
            {userData?.pasahero?.profileUrl? 
            <Image
            className=" w-24 h-24 rounded-full"
            source={{
            uri: userData.pasahero.profileUrl
            }}
            />
            :
            <Image
            className=" w-24 h-24 rounded-full"
            source={require("../../assets/emptyProfile.png")}
            />}
            <View className=" flex flex-col h-full justify-center  flex-1 ml-3">
                <Text className=" text-2xl font-black text-gray-700">{userData.pasahero.fullName}</Text>
                <Text>@{userData.pasahero.username}</Text>
            </View>
        </View>
        <View className="bg-white px-4 py-4 flex flex-1 justify-between h-full flex-col mb-0.5">
            <View className=" flex flex-col w-full" >
            <Text className=" text-xl font-black text-gray-800 mb-2">Personal Information</Text>

            <Text className=" text-base font-bold text-gray-600 pl-2 ">Gender</Text>
            <Text className=" text-base font-bold text-cyan-700 pl-2 -mt-1 mb-3">{userData.pasahero.gender}</Text>

            <Text className=" text-base font-bold text-gray-600 pl-2 ">Contact No.</Text>
            {userData.pasahero.contactNo?<Text className=" text-base font-bold text-cyan-700 pl-2 -mt-1 mb-3">{userData.pasahero.contactNo }</Text>:
            <Text className=" text-sm text-gray-400 pl-2 -mt-1 mb-3">{"None"}</Text>}

            <Text className=" text-base font-bold text-gray-600 pl-2 ">Emergency Contact No.</Text>
            <Text className=" text-base font-bold text-cyan-700 pl-2 -mt-1 mb-3">{userData.pasahero.emergencyContact}</Text>

            <Text className=" text-base font-bold text-gray-600 pl-2 ">Address</Text>
            <Text className=" text-base font-bold text-cyan-700 pl-2 -mt-1 mb-3">{userData.pasahero.address}</Text>

            </View>
            <TouchableOpacity onPress={_logout} className=" px-10 border-red-500 rounded-full mb-10 mx-16 border border-solid py-1 flex flex-row items-center justify-center text-red-500">
                <Text className=" text-red-500 text-base mr-2">Logout</Text>
                <Ionicons name="log-out-outline" color="red" size={20}/>
            </TouchableOpacity>
        </View>
    </View> 
    ):
    <View></View>;
}
 
export default Account;