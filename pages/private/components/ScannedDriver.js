import { useState } from "react";
import { Alert, FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { createStartRide } from "../../../server/api/ride";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { ALERT_TYPE,  Dialog, Toast } from 'react-native-alert-notification';

const ScannedDriver = ({getLocation, handleRescan ,driver, commentByDriver, setActiveRide, _getRidesByPasahero}) => {
    const [confirmModal, setConfirmModal] = useState(false);
    const [createRideLoading, setCreateRideLoading] = useState(false);


    const _createStartRide = async ({driverId}) => {
        getLocation().then(async(data)=>{
            const {coords} = data
            if(data){
                if(!coords.latitude || !coords.longitude){
                    Dialog.show({
                        type: ALERT_TYPE.INFO,
                        textBody: <View className="w-full text-center">
                            <Text className="font-black text-center ">Can't get location.</Text>
                            <Text className="font-black text-center ">Please restart the app.</Text>
                            <Text className="text-center flex-nowrap">If you just enabled your location,</Text>
                            <Text className="text-center flex-nowrap">we need to restart the app.</Text>
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
                            _getRidesByPasahero({pasaheroId})
                            handleRescan()
                          }
                    }).finally(()=>{
                        setConfirmModal(false)
                    })
                }
            }else {
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    textBody: <Text className="font-black ">Please on your location</Text>,
                })
            }
        });
    }
    console.log(driver)
    let Driver = () =><View><Text className="px-10 text-center text-white">Loading ...</Text></View>
    if(!!driver.data){
        Driver = () => (
            <View className="w-full h-full ">
            <Modal
            animationType="slide"
            transparent={true}
            visible={confirmModal}
            onRequestClose={() => {
                setConfirmModal(!confirmModal);
            }}>
            <View className="flex items-center justify-center w-full h-full p-4 " style={{ backgroundColor:'rgba(0,0,0,0.5)'}}>
                <View className="p-4 bg-white rounded-md ">
                    <Text className="px-3 pb-1 text-lg font-extrabold ">Confirm Ride</Text>
                    <Text className="px-3 pb-3 text-sm ">You're about to ride with this driver. Confirm to start ride.</Text>
                        <View className="flex flex-row items-center justify-center gap-2 pt-1 ">
                        <TouchableOpacity disabled={createRideLoading} onPress={() => {
                setConfirmModal(!confirmModal);
            }} className="flex items-center justify-center w-2/5 px-5 py-2 bg-white border border-gray-200 rounded ">
                            <Text className="text-sm text-gray-500 ">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={createRideLoading} onPress={()=>_createStartRide({driverId:driver.data.id})} className="flex items-center justify-center w-2/5 px-5 py-2 bg-green-500 border border-green-300 rounded ">
                            <Text className="text-sm text-white ">{createRideLoading?"Loading ...":"Ride"}</Text>
                        </TouchableOpacity>
                        </View>
                </View>
            </View>
            </Modal>
                <Text className="p-1 pt-0 text-sm font-bold text-white ">Driver's Details</Text>
                <View className="flex flex-row items-center w-full p-1 bg-white rounded-t-lg ">
                    <Image
                    className="flex items-center justify-center w-20 h-20 rounded-lg "
                    source={{
                    uri: driver.data.profileUrl
                    }}
                    />
                    <View className="flex flex-col px-3 ">
                        {driver?.data?.status !== "APPROVED" ? <Text className={`-mt-1 text-sm capitalize -mb-1 ${
                            driver?.data?.status ==="PENDING" ? "text-orange-500":"text-red-500"
                        }`}>{driver?.data?.status}</Text>:(
                            driver.data.rating ? <View className="flex items-start justify-start w-full text-start">
                                <Rating
                                type="custom"
                            imageSize={15}
                            ratingCount={5}
                            style={{padding:0, margin:0}}
                            readonly
                            startingValue={driver.data.rating}
                            className="flex items-start w-full p-0 m-0 "
                            /></View>:<Text className="-mb-1 text-xs text-gray-400 ">No Rating</Text>)}
                        <Text className="text-base font-black text-gray-700 capitalize text-start">{driver.data.fullName}</Text>
                        <Text className="-mt-1 text-sm text-gray-500 capitalize ">{driver.data.gender}</Text>
                    </View>
                </View>
                <View className="bg-white rounded-b-lg ">
                    <View className="flex flex-row items-center justify-between w-full p-2 px-3 pt-0 pb-1 ">
                        <Text className="text-sm font-black text-gray-700 uppercase ">{driver.data.vehicleType.vehicleType}</Text>
                       {driver.data.registrationId && <Text className="text-xs text-gray-500 capitalize font-base">Plate No : {driver.data.plateNo}</Text>}
                    </View>
                    <View className="flex flex-col w-full px-3 pt-0 pb-2 ">
                    {driver.data.registrationId && 
                    <>
                        <View className="flex flex-row items-center ">
                            <Text className="text-xs font-black text-gray-700 ">Licence no. : </Text>
                            <Text className="text-xs text-gray-500 ">{driver?.data?.licenceNo}</Text>
                        </View>
                        <View className="flex flex-row items-center ">
                            <Text className="text-xs font-black text-gray-700 ">Licence Status : </Text>
                            {dayjs().isBefore(dayjs(driver?.data?.licenceExpiration))? <Text className="text-xs text-green-500">Active</Text>:<Text className="text-xs text-red-500">Expired</Text>}
                        </View>
                        </>}
                        <View className="flex flex-row items-center ">
                            <Text className="text-xs font-black text-gray-700 ">Address : </Text>
                            <Text className="text-xs text-gray-500 ">{driver.data.address}</Text>
                        </View>
                        <View className="flex flex-row items-center ">
                            <Text className="text-xs font-black text-gray-700 ">Contact no. : </Text>
                            <Text className="text-xs text-gray-500 ">{driver.data.contactNo}</Text>
                        </View>
                    </View>
                </View>
                <Text className="p-1 pb-0 text-sm font-bold text-white ">Comments</Text>
                    {
                        commentByDriver?.data?.length ? 
                        <FlatList className="w-full max-h-full p-1 mt-1 bg-gray-200 rounded-lg"
                          data={commentByDriver.data}
                          renderItem={({item}) => (
                          <View className="p-2 bg-white rounded ">
                            <Text className="font-extrabold">{item.Pasahero.fullName}</Text>
                            {
                            item.Ride?.Rating ? <View className="flex items-start justify-start w-full text-start">
                                <Rating
                                type="custom"
                            imageSize={10}
                            ratingCount={5}
                            style={{padding:0, margin:0}}
                            readonly
                            startingValue={item.Ride?.Rating.rating}
                            className="flex items-start w-full p-0 m-0 "
                            /></View>:<Text className="text-xs text-gray-400 ">No Rating</Text>
                        }
                            <Text className="text-gray-700 ">{item.comment}</Text>
                        </View>)}
                          keyExtractor={item => item.id}
                        />: 
                        <View className="flex items-center justify-center flex-1 w-full max-h-full p-1 mt-1 bg-gray-200 rounded-lg ">
                            <Text className="font-medium text-center text-gray-400 ">No Comment</Text>
                        </View>
                    }
                <View className="flex flex-row items-center justify-center gap-2 px-5 pt-1 ">
                <TouchableOpacity onPress={handleRescan} className="flex items-center justify-center w-2/5 px-5 py-2 bg-white border border-white rounded ">
                    <Text className="text-sm text-gray-500 ">Rescan</Text>
                </TouchableOpacity>
                {driver?.data?.status === "APPROVED" && <TouchableOpacity onPress={()=>setConfirmModal(true)} className="flex items-center justify-center w-2/5 px-5 py-2 bg-green-500 border border-green-300 rounded ">
                    <Text className="text-sm text-white ">Ride</Text>
                </TouchableOpacity>}
                </View>
            </View>
        )
    }else if(!driver.data && !driver.isLoading){
        Driver = () => <View className="flex flex-col items-center w-full ">
            <Text className="px-10 font-semibold text-center text-white">No Driver Found. Please Scan a legit Pasaheroes App Driver's QR Code</Text>
            <View className="flex flex-row items-center justify-center px-5 mt-2 ">
                <TouchableOpacity onPress={handleRescan} className="flex items-center justify-center w-1/3 px-5 py-1 border border-white rounded ">
                    <Text className="text-sm text-white ">Rescan</Text>
                </TouchableOpacity>
                </View>
            </View>
    }
    return ( 
    <View className="flex items-center justify-center flex-1 p-1 pb-1 m-1 border border-gray-200 rounded-lg bg-cyan-600">
        <Driver/>
    </View>
     );
}
 
export default ScannedDriver;