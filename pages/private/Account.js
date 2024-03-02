import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo  from 'react-native-vector-icons/Entypo';
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
    <View className="bg-white py-0.5 flex-1 flex flex-col">
        <View className="bg-white px-4 py-4 flex items-center justify-center h-32 flex-col mb-0.5">
            <View className=" w-32 h-32 rounded-full border-4 border-gray-300">
            {userData?.pasahero?.profileUrl? 
            <Image
            className=" w-full h-full rounded-full"
            source={{
            uri: userData.pasahero.profileUrl
            }}
            />
            :
            <Image
            className=" w-full h-full rounded-full"
            source={require("../../assets/emptyProfile.png")}
            />}
            </View>
        </View>
            <View className=" flex flex-col justify-center items-center">
                <Text className=" text-2xl font-black text-gray-700">{userData.pasahero.fullName}</Text>
                <Text>@{userData.pasahero.username}</Text>
            </View>
        <View className="bg-white px-6 py-4 flex flex-1 justify-between h-full flex-col mb-0.5">
            <View className=" flex flex-col w-full" >
            <Text className=" text-sm font-black text-gray-600 mb-2">Personal Info</Text>

            <View className="w-full rounded-3xl overflow-hidden bg-gray-100 flex flex-col">
                <View className="flex flex-row justify-between py-4 px-4">
                    <View className="flex flex-row items-center">
                        <MaterialCommunityIcons name="gender-male-female" color="orange" size={23}/>
                        <Text className=" text-xs font-semibold text-gray-500 ml-2">Gender</Text>
                    </View>
                    <View className="flex flex-row items-center">
                        <Text className=" text-xs font-bold text-gray-600">{userData.pasahero.gender}</Text>
                    </View>
                </View>
                <View className=" h-0.5 bg-white w-full"/>
                <View className="flex flex-row justify-between py-4 px-4">
                    <View className="flex flex-row items-center">
                        <MaterialCommunityIcons name="phone" color="orange" size={23}/>
                        <Text className=" text-xs font-semibold text-gray-500 ml-2">Contact</Text>
                    </View>
                    <View className="flex flex-row items-center">
                        <Text className=" text-xs font-bold text-gray-600">{userData.pasahero.contactNo}</Text>
                    </View>
                </View>
                <View className=" h-0.5 bg-white w-full"/>
                <View className="flex flex-row justify-between py-4 px-4">
                    <View className="flex flex-row items-center">
                        <MaterialCommunityIcons name="phone" color="orange" size={23}/>
                        <Text className=" text-xs font-semibold text-gray-500 ml-2">Emergency Contact</Text>
                    </View>
                    <View className="flex flex-row items-center">
                        <Text className=" text-xs font-bold text-gray-600">{userData.pasahero.emergencyContact}</Text>
                    </View>
                </View>
                <View className=" h-0.5 bg-white w-full"/>
                <View className="flex flex-row justify-between py-4 px-4">
                    <View className="flex flex-row items-center">
                        <Entypo name="location" color="orange" size={23}/>
                        <Text className=" text-xs font-semibold text-gray-500 ml-2">Address</Text>
                    </View>
                    <View className="flex flex-row items-center">
                        <Text className=" text-xs font-bold text-gray-600">{userData.pasahero.address}</Text>
                    </View>
                </View>
            </View>

            </View>
    <TouchableOpacity onPress={_logout} className=" px-10 border-red-500 rounded-full mb-10 mx-16 border border-solid py-1 flex flex-row items-center justify-center text-red-500">
        <Text className=" text-red-500 text-xs mr-2">Logout</Text>
        <Ionicons name="log-out-outline" color="red" size={18}/>
    </TouchableOpacity>
        </View>
    </View> 
    ):
    <View>
    <TouchableOpacity onPress={_logout} className=" px-10 border-red-500 rounded-full mb-10 mx-16 border border-solid py-1 flex flex-row items-center justify-center text-red-500">
        <Text className=" text-red-500 text-xs mr-2">Logout</Text>
        <Ionicons name="log-out-outline" color="red" size={18}/>
    </TouchableOpacity></View>;
}
 
export default Account;