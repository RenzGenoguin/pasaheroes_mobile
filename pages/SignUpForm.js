import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Text, View } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'


const SignUpForm = () => {  
    const [selected, setSelected] = useState("");
  
const data = [
    {key:'1', value:'Mobiles', disabled:true},
    {key:'2', value:'Appliances'},
    {key:'3', value:'Cameras'},
    {key:'4', value:'Computers', disabled:true},
    {key:'5', value:'Vegetables'},
    {key:'6', value:'Diary Products'},
    {key:'7', value:'Drinks'},
]
    return ( 
    <LinearGradient colors={[ '#04d4f4','#086cf4']} className="flex-1 flex justify-center items-center w-full px-2 py-4">
        <View className=" bg-white rounded-2xl h-full p-2 w-full">
            <Text className=" text-2xl -mb-1 font-black text-sky-700 text-center">PASAHEROES</Text>
            <Text className=" text-sm uppercase text-sky-700 text-center">Sign up form</Text>
            <SelectList
        setSelected={(val) =>{ setSelected(val); console.log(val)}} 
        data={data} 
        save="value"
    />
        </View>
    </LinearGradient> );
}
 
export default SignUpForm;