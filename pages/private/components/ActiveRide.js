import { useEffect, useState } from "react";
import { FlatList, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { createStartRide, endRide } from "../../../server/api/ride";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { rateAndComment } from "../../../server/api/comment";
import dayjs from "dayjs";

const ActiveRide = ({_getActiveRide, activeUserId, ride, commentByDriver, setActiveRide}) => {
    const [confirmModal, setConfirmModal] = useState(false)
    const [endRideLoading, setEndRideLoading] = useState(false)
    const [rateAndCommentLoading, setRateAndCommentLoading] = useState(false)
    const [rateAndCommentIsOpen, setRateAndCommentIsOpen] = useState(false)
    const [rating, setRating] = useState(null)
    const [comment, setComment] = useState(null)
    const driver= {data:ride.data.Driver}
    const rideData = ride.data

    const _endRide = async () => {
        setEndRideLoading(true)
        const activeId =  await AsyncStorage.getItem('activeId');
        const pasaheroId = parseInt(activeId);
        await endRide({rideId:rideData.id}).then((ride)=>{
            setConfirmModal(false)
            setEndRideLoading(false)
                setActiveRide({
                  isLoading:false,
                  data:null,
                  error:ride.error
                })
        })
    }

    const _setRating = (rating) => {
        setRating(rating)
      }

    const _setComment = (comment) => {
        if(comment.length){

        setComment(comment)
        }else{
            setComment(null)
        }
    }

    const _setRateAndCommentIsOpen = () => {
        setRateAndCommentIsOpen(!rateAndCommentIsOpen);
    }
    useEffect(()=>{
        setRating(rideData?.Rating?.rating || null)
        setComment(rideData?.Comment?.comment || null)
    },[rideData?.Comment?.comment, rideData?.Comment?.rate])

    const _submitRateAndComment = async () => {
        setRateAndCommentLoading(true)
        const payload = {
            rideId:rideData.id, 
            driverId:rideData.Driver.id, 
            pasaheroId:activeUserId, 
            rating, 
            comment,
            ratingId:rideData?.Rating?.id || null,
            commentId:rideData?.Comment?.id|| null,
        }
        console.log(payload)
        await rateAndComment(payload).then( async()=>{
            await _getActiveRide({pasaheroId:activeUserId}).then(()=>{
                _setRateAndCommentIsOpen()
            })
        }).finally(()=>{
            setRateAndCommentLoading(false)
        })
    }

        return  (
            <View className=" h-full w-full bg-cyan-700">

            <Modal
            animationType="slide"
            transparent={true}
            visible={confirmModal}
            onRequestClose={() => {
                setConfirmModal(!confirmModal);
            }}>
            <View className=" w-full h-full flex items-center justify-center p-4" style={{ backgroundColor:'rgba(0,0,0,0.5)'}}>
                <View className=" bg-white rounded-md p-4">
                    <Text className="  pb-1 text-lg font-extrabold px-3">End Ride</Text>
                    <Text className="  pb-3 text-sm px-3">You're about to end this ride. Confirm to end ride.</Text>
                        <View className=" flex flex-row items-center justify-center pt-1 gap-2">
                        <TouchableOpacity disabled={endRideLoading} onPress={() => {
                setConfirmModal(!confirmModal);
            }} className=" w-2/5 flex items-center bg-white justify-center rounded px-5 py-2 border border-gray-200">
                            <Text className=" text-gray-500 text-sm">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={endRideLoading} onPress={_endRide} className=" border-orange-300 w-2/5 flex items-center justify-center rounded px-5 py-2 border bg-orange-500">
                            <Text className=" text-white text-sm">{endRideLoading?"Loading ...":"Confirm"}</Text>
                        </TouchableOpacity>
                        </View>
                </View>
            </View>
            </Modal>

            <Modal
            animationType="slide"
            transparent={true}
            visible={rateAndCommentIsOpen}
            onRequestClose={() => {
                setRateAndCommentIsOpen(!rateAndCommentIsOpen);
            }}>
            <View className=" w-full h-full flex items-center justify-center p-4" style={{ backgroundColor:'rgba(0,0,0,0.5)'}}>
                <View className=" bg-white rounded-md p-4">
                    <Rating
                    showRating
                    startingValue={rating}
                    onFinishRating={_setRating}
                    disabled={rateAndCommentLoading}
                    style={{ paddingVertical: 10 }}
                    />
                    <Text className="  pb-2 text-sm">Comment :</Text>

                    <TextInput
                    placeholder="Input comment"
                    textAlignVertical="top"
                    editable={!rateAndCommentLoading}
                    multiline
                    sta
                    numberOfLines={4}
                    className=" border border-gray-300 rounded p-2"
                    onChangeText={_setComment}
                    value={comment}
                    />
                        <View className=" flex flex-row items-center justify-center pt-3 gap-2">
                            <TouchableOpacity disabled={rateAndCommentLoading} onPress={_setRateAndCommentIsOpen} 
                            className=" w-2/5 flex items-center bg-white justify-center rounded px-5 py-2 border border-gray-200">
                                <Text className=" text-gray-500 text-sm">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={!(comment || rating) || rateAndCommentLoading} onPress={_submitRateAndComment} className=" border-orange-300 w-2/5 flex items-center justify-center rounded px-5 py-2 border bg-orange-500">
                                <Text className=" text-white text-sm">{(rateAndCommentLoading)?"Loading ...":"Submit"}</Text>
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
                            rideData.avgRating ? <View className=" flex items-start justify-start w-full text-start">
                                <Rating
                                type="custom"
                            imageSize={15}
                            ratingCount={5}
                            style={{padding:0, margin:0}}
                            readonly
                            startingValue={rideData.avgRating}
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
                <Text className=" px-1 pb-0 text-sm font-bold text-white">Comments</Text>
                    {
                        commentByDriver?.data?.length ? 
                        <FlatList className="max-h-full w-full bg-gray-200 mt-1 p-1 rounded-lg"
                          data={commentByDriver.data}
                          renderItem={({item}) => {
                            return(
                          <View className=" p-2 bg-white rounded mb-1">
                            <Text className="font-extrabold">{item.pasaheroId === activeUserId ?"You" : item.Pasahero.fullName}</Text>
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
                            <Text className=" text-gray-400 text-xs font-bold w-full text-right">{dayjs(item.Ride?.updatedAt).format("h:mm A - MMM D, YYYY ")}</Text>
                        </View>)}}
                          keyExtractor={item => item.id}
                        />: 
                        <View className=" flex-1 max-h-full w-full flex justify-center items-center bg-gray-200 mt-1 p-1 rounded-lg">
                            <Text className=" font-medium text-center text-gray-400">No Comment</Text>
                        </View>
                    }
                <View className=" flex flex-row items-center justify-center px-5 pt-1 gap-2 mb-1">
                <TouchableOpacity onPress={()=>setRateAndCommentIsOpen(true)} className=" border-orange-500 min-w-2/5 flex items-center justify-center rounded px-5 py-2 border bg-gray-200">
                    <Text className=" text-orange-500 font-bold text-sm">Rate & Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setConfirmModal(true)} className=" border-orange-300 w-2/5 flex items-center justify-center rounded px-5 py-2 border bg-orange-500">
                    <Text className=" text-white text-sm">End Ride</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    
}
 
export default ActiveRide;