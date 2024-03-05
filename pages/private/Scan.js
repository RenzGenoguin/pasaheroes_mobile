import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { AppContext } from "../../context/AppContext";

export default function App() {
  const {
    selectedDriverId, 
    setSelectedDriverId,
    driver, 
    setDriver
  } = useContext(AppContext)
  
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(()=>{
    console.log(driver, "useEffectDriver")
  },[driver])
  
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

  if (hasPermission === null) {
    return <View className=" w-full h-full items-center justify-center flex"><Text>Requesting for camera permission</Text></View>;
  }
  if (hasPermission === false) {
    return <View className=" w-full h-full items-center justify-center flex"><Text>No Access To Camera</Text></View>;
  }

  if(selectedDriverId){
    return (<View className=" w-full h-full items-center justify-center flex">
        <Text>{selectedDriverId}</Text>
        <View className=" flex flex-row items-center justify-center px-5 mt-5">
        <TouchableOpacity onPress={() => setSelectedDriverId(null)} className=" w-1/2 flex items-center justify-center rounded px-5 py-2 bg-cyan-600 text-white">
            <Text className=" text-white text-base">Rescan</Text>
        </TouchableOpacity>
        </View>
    </View>)
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={selectedDriverId ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
// import { CameraView, useCameraPermissions } from 'expo-camera/next';
// import { View } from 'react-native';

// const Scan = () => {
//     return ( <View>
//         <CameraView  facing={"back"}>
//         </CameraView>
//     </View> );
// }
 
// export default Scan;