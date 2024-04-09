import { useState } from "react";
import { Alert, FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { createStartRide } from "../../../server/api/ride";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ALERT_TYPE,  Dialog, Toast } from 'react-native-alert-notification';

const ScannedDriver = ({getLocation, handleRescan ,driver, commentByDriver, setActiveRide}) => {
    const [confirmModal, setConfirmModal] = useState(false);
    const [createRideLoading, setCreateRideLoading] = useState(false);


    const _createStartRide = async ({driverId}) => {
        getLocation().then(async(data)=>{
            const {coords} = data
            if(data){
                if(!coords.latitude || !coords.longitude){
                    Dialog.show({
                        type: ALERT_TYPE.INFO,
                        textBody: <View className="text-center w-full">
                            <Text className=" font-black text-center">Can't get location.</Text>
                            <Text className=" font-black text-center">Please restart the app.</Text>
                            <Text className=" text-center flex-nowrap">If you just enabled your location,</Text>
                            <Text className=" text-center flex-nowrap">we need to restart the app.</Text>
                            </View>,
                    })
                }else{
                    setCreateRideLoading(true)
                    const activeId =  await AsyncStorage.getItem('activeId');
                    const pasaheroId = parseInt(activeId);
                    await createStartRide({pasaheroId, driverId, 
                        startLat:coords.latitude,
                        startLong:coords.longitude }).then((ride)=>{
                        setConfirmModal(false)
                        setCreateRideLoading(false)
                        if(ride){
                            setActiveRide({
                              isLoading:false,
                              data:ride.data,
                              error:ride.error
                            })
                            handleRescan()
                          }
                    })
                }
            }else {
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    textBody: <Text className=" font-black">Please on your location</Text>,
                })
            }
        });
    }
    let Driver = () =><View><Text className="text-center px-10 text-white">Loading ...</Text></View>
    if(!!driver.data){
        Driver = () => (
            <View className=" h-full w-full ">
            <Modal
            animationType="slide"
            transparent={true}
            visible={confirmModal}
            onRequestClose={() => {
                setConfirmModal(!confirmModal);
            }}>
            <View className=" w-full h-full flex items-center justify-center p-4" style={{ backgroundColor:'rgba(0,0,0,0.5)'}}>
                <View className=" bg-white rounded-md p-4">
                    <Text className="  pb-1 text-lg font-extrabold px-3">Confirm Ride</Text>
                    <Text className="  pb-3 text-sm px-3">You're about to ride with this driver. Confirm to start ride.</Text>
                        <View className=" flex flex-row items-center justify-center pt-1 gap-2">
                        <TouchableOpacity disabled={createRideLoading} onPress={() => {
                setConfirmModal(!confirmModal);
            }} className=" w-2/5 flex items-center bg-white justify-center rounded px-5 py-2 border border-gray-200">
                            <Text className=" text-gray-500 text-sm">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={createRideLoading} onPress={()=>_createStartRide({driverId:driver.data.id})} className=" border-green-300 w-2/5 flex items-center justify-center rounded px-5 py-2 border bg-green-500">
                            <Text className=" text-white text-sm">{createRideLoading?"Loading ...":"Ride"}</Text>
                        </TouchableOpacity>
                        </View>
                </View>
            </View>
            </Modal>
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
                <Text className=" p-1 pb-0 text-sm font-bold text-white">Comments</Text>
                    {
                        commentByDriver?.data?.length ? 
                        <FlatList className="max-h-full w-full bg-gray-200 mt-1 p-1 rounded-lg"
                          data={commentByDriver.data}
                          renderItem={({item}) => (
                          <View className=" p-2 bg-white rounded">
                            <Text className="font-extrabold">{item.Pasahero.fullName}</Text>
                            {
                            item.Ride?.Rating ? <View className=" flex items-start justify-start w-full text-start">
                                <Rating
                                type="custom"
                            imageSize={10}
                            ratingCount={5}
                            style={{padding:0, margin:0}}
                            readonly
                            startingValue={item.Ride?.Rating.rating}
                            className=" w-full flex items-start p-0 m-0"
                            /></View>:<Text className=" text-xs text-gray-400">No Rating</Text>
                        }
                            <Text className=" text-gray-700">{item.comment}</Text>
                        </View>)}
                          keyExtractor={item => item.id}
                        />: 
                        <View className=" flex-1 max-h-full w-full flex justify-center items-center bg-gray-200 mt-1 p-1 rounded-lg">
                            <Text className=" font-medium text-center text-gray-400">No Comment</Text>
                        </View>
                    }
                <View className=" flex flex-row items-center justify-center px-5 pt-1 gap-2">
                <TouchableOpacity onPress={handleRescan} className=" w-2/5 flex items-center bg-white justify-center rounded px-5 py-2 border border-white">
                    <Text className=" text-gray-500 text-sm">Rescan</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setConfirmModal(true)} className=" border-green-300 w-2/5 flex items-center justify-center rounded px-5 py-2 border bg-green-500">
                    <Text className=" text-white text-sm">Ride</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }else if(!driver.data && !driver.isLoading){
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