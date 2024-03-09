import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Rating, AirbnbRating } from 'react-native-ratings';

const ScannedDriver = ({handleRescan ,driver}) => {
    let Driver = () =><View><Text className="text-center px-10">Loading ...</Text></View>
    if(!!driver.data){
        Driver = () => (
            <View className=" h-full w-full ">
                <Text className=" p-1 pt-0 text-sm font-bold text-white">Driver's Details</Text>
                <View className=" w-full flex flex-row items-center bg-white p-1 rounded-t-lg">
                    <Image
                    className=" w-20 h-20  rounded-lg flex items-center justify-center"
                    source={{
                    uri: driver.data.profileUrl
                    }}
                    />
                    <View className=" px-3 flex flex-col">
                        {
                            driver.data.rating ? <View className=" flex items-start justify-start w-full text-start">
                                <Rating
                                type="custom"
                            imageSize={15}
                            ratingCount={5}
                            style={{padding:0, margin:0}}
                            readonly
                            startingValue={driver.data.rating}
                            className=" w-full flex items-start p-0 m-0"
                            /></View>:<Text className=" text-xs text-gray-400 -mb-1">No Rating</Text>
                        }
                        <Text className=" text-gray-700 font-black text-base text-start capitalize">{driver.data.fullName}</Text>
                        <Text className=" text-gray-500 text-sm capitalize -mt-1">{driver.data.gender}</Text>
                    </View>
                </View>
                <View className="bg-white rounded-b-lg ">
                    <View className=" w-full p-2 pb-1 pt-0 flex   flex-row items-center  justify-between px-3">
                        <Text className=" text-gray-700 font-black text-sm uppercase">{driver.data.vehicleType.vehicleType}</Text>
                        <Text className=" text-gray-500 font-base text-xs capitalize">Plate No : {driver.data.plateNo}</Text>
                    </View>
                    <View className=" w-full px-3 pb-2 pt-0 flex flex-col">
                        <View className=" flex flex-row items-center">
                            <Text className=" text-gray-700 font-black text-xs">Licence no. : </Text>
                            <Text className=" text-gray-500 text-xs">{driver.data.licenceNo}</Text>
                        </View>
                        <View className=" flex flex-row items-center">
                            <Text className=" text-gray-700 font-black text-xs">Address : </Text>
                            <Text className=" text-gray-500 text-xs">{driver.data.address}</Text>
                        </View>
                        <View className=" flex flex-row items-center">
                            <Text className=" text-gray-700 font-black text-xs">Contact no. : </Text>
                            <Text className=" text-gray-500 text-xs">{driver.data.contactNo}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView className="max-h-full w-full bg-gray-50 mt-1 rounded-lg">
                </ScrollView>
                <View className=" flex flex-row items-center justify-center px-5 pt-1 gap-2">
                <TouchableOpacity onPress={handleRescan} className=" w-2/5 flex items-center bg-white justify-center rounded px-5 py-2 border border-white">
                    <Text className=" text-gray-500 text-sm">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRescan} className=" border-green-300 w-2/5 flex items-center justify-center rounded px-5 py-2 border bg-green-500">
                    <Text className=" text-white text-sm">Ride</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }else {
        Driver = () => <View className=" w-full flex flex-col items-center ">
            <Text className="text-center px-10 text-white font-semibold">No Driver Found. Please Scan a legit Pasaheroes App Driver's QR Code</Text>
            <View className=" flex flex-row items-center justify-center px-5 mt-2">
                <TouchableOpacity onPress={handleRescan} className=" w-1/3 flex items-center justify-center rounded px-5 py-1 border border-white">
                    <Text className=" text-white text-sm">Rescan</Text>
                </TouchableOpacity>
                </View>
            </View>
    }
    return ( 
    <View className=" flex-1 p-1 pb-1 items-center justify-center flex  border rounded-lg border-gray-200 m-1 bg-cyan-600">
    <Driver/>
    </View>
     );
}
 
export default ScannedDriver;