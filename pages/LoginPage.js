import { Button, Pressable, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginPage () {
    return (
    <View className="flex-1 flex justify-center items-center w-full">
        <View className=" w-11/12 bg-white rounded-lg p-5 flex items-center justify-center">
            <Text className=" text-3xl font-black text-sky-600">PASAHEROES</Text>
            <Pressable className=" rounded-full w-5/6 overflow-hidden" onPress={()=>console.log("login")} >
            <LinearGradient
                className="flex justify-center items-center w-full p-2 "
                colors={[ '#10E5FF','#2285FF']}>
                    <Text className=" text-white font-black uppercase">Login</Text>
            </LinearGradient>
            </Pressable>
            <View className=" flex justify-center w-full items-center pt-2 flex-row gap-1">
                <Text className=" text-xs">Don't have an account?</Text>
                <Pressable onPress={()=>console.log("register")} >
                    <Text className=" text-xs font-bold text-sky-500">Register</Text>
                </Pressable>
            </View>
        </View>
    </View>
    )
} 

//className=""