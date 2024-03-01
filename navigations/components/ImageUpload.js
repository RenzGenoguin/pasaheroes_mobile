import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { firebase } from "../../server/firebase/config";
import { useState } from "react";

const ImageUpload = ({error}) => {
    const [image ,setImage] = useState(null)
    const [uploading ,setUploading] = useState(false)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:1
        });
         if(!result.canceled){
            setImage(result.assets[0].uri)
         }
    }

    return ( 
    <View className=" flex flex-row gap-1 mb-3">
        <View className=" flex flex-col flex-1">
            <Text className=" flex w-full px-1 text-sky-700 text-xs mb-1">Upload Profile</Text>
            <TouchableOpacity onPress={pickImage}>
            {
             image ?
             <Image
             className=" w-16 h-16  border  rounded-lg flex items-center justify-center"
             source={{
             uri: image
             }}
             />:
             <View className={` w-16 h-16  border  rounded-lg flex items-center justify-center ${error ? "border-red-300":"border-gray-300"}`}>
             <Icon name="image" color="gray" size={35}/>
             </View>
            }
            </TouchableOpacity>
        </View>
    </View>
);
}
 
export default ImageUpload;