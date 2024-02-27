import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MyTabBar({ state, descriptors, navigation }) {
  return (
    <LinearGradient colors={[ '#04d4f4','#086cf4']} className="flex flex-row justify-between items-center  w-full py-1 pb-2">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        const getIconName =(name)=>{
          switch(name){
            case "History":
              return "clipboard-list";
            case "Scan":
              return "data-matrix-scan";
            case "Account":
              return "account-cog";
          }
        }
        return (
          <TouchableOpacity
          key={index}
          className={` flex items-center justify-center  rounded-xl p-1 mx-5  ${isFocused ? ' bg-blue-800' : ''}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
          <MaterialCommunityIcons name={getIconName(label)} color={isFocused ? 'white' : '#ffffff50'} size={23} />
            <Text style={{ color: isFocused ? 'white' : '#ffffff50' }} className=" text-xs">
              {label}
            </Text>
          </TouchableOpacity>
          //clipboard-list
          //account-cog
        );
      })}
    </LinearGradient>
  );
}

