import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { AppContext } from "../../context/AppContext";
import { Modal } from "react-native-paper";
import ScannedDriver from "./components/ScannedDriver";
import { defaultDriverData } from "../../App";
import ActiveRide from "./components/ActiveRide";

export default function App() {
  const {
    selectedDriverId, 
    setSelectedDriverId,
    driver, 
    setDriver,
    commentByDriver,
    setCommentByDriver,
    activeRide, 
    setActiveRide,
    activeUserId,
    _getActiveRide
  } = useContext(AppContext)
  
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setSelectedDriverId(data);
  };

  const handleRescan = () =>{
    setSelectedDriverId(null)
    setDriver(defaultDriverData)
    setCommentByDriver(defaultDriverData)
  }

  if (hasPermission === null) {
    return <View className=" w-full h-full items-center justify-center flex"><Text>Requesting for camera permission</Text></View>;
  }
  if (hasPermission === false) {
    return <View className=" w-full h-full items-center justify-center flex"><Text>No Access To Camera</Text></View>;
  }

  if(activeRide?.data){
    return <ActiveRide _getActiveRide={_getActiveRide} activeUserId={activeUserId} ride={activeRide} commentByDriver={commentByDriver}  setActiveRide={setActiveRide}/>
  }else if(activeRide.isLoading){
    return <View><Text className="text-center px-10 text-white">Loading ...</Text></View>
  }else{
    if(selectedDriverId){
      return (<ScannedDriver handleRescan={handleRescan} driver={driver} commentByDriver={commentByDriver} setActiveRide={setActiveRide}/>)
    } else {
      return (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={selectedDriverId ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      );
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});