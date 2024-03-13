import { useContext, useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../../context/AppContext";
import dayjs from "dayjs";

const History = () => {
    const {
        rideHistory,
        _getRidesByPasahero,
        activeUserId
    } = useContext(AppContext)
    
  const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await _getRidesByPasahero({pasaheroId:activeUserId});
        setTimeout(() => {
          setRefreshing(false);
        }, 1000); // Refresh indicator will be visible for at least 1 second
      };

    const renderItem = ({ item }) => (<View className=" flex rounded p-2 bg-white items-center justify-center">
    <View className=" w-full flex justify-between flex-row items-center">
        <Text className=" font-black">{item.Driver.vehicleType.vehicleType}</Text>
    </View>

    <View className=" w-full flex flex-row items-center ">
            <Text className=" font-bold text-cyan-600">{"Driver : "}</Text>
            <Text className=" font-medium">{item.Driver.fullName}</Text>
        </View>
    <View className=" w-full flex flex-row items-center">
            <Text className=" font-bold text-cyan-600">{"Contact No. : "}</Text>
            <Text className=" font-medium">{item.Driver.contactNo}</Text>
        </View>
        <View className=" flex flex-row w-full mt-1 rounded border border-gray-200 bg-gray-50 ">
            <View className="flex-1 flex flex-col mr-1  p-1 px-2 rounded ">
                <Text className=" font-bold  text-gray-800">{"Ride Started"}</Text>
                <Text className=" text-gray-600 text-xs font-bold">{dayjs(item.startRide).format("MMM D, YY h:mm A")}</Text>
            </View>
            <View className="flex-1 flex flex-col mr-1  p-1 px-2 rounded ">
                <Text className=" font-bold  text-gray-800">{"Ride Ended"}</Text>
                {
                    item.endRide ? 
                    <Text className=" text-gray-600 text-xs font-bold">{dayjs(item.endRide).format("MMM D, YY h:mm A")}</Text>:

                <Text className=" text-orange-500 text-xs font-bold">{"Riding"}</Text>
                }
            </View>
        </View>
    </View>
)
    return ( <View className=" w-full h-full  p-1 flex flex-col  bg-cyan-600">
            <FlatList
            data={rideHistory?.data || []}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={<View className=" mb-1"/>}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            />
        </View> );
}
 
export default History;