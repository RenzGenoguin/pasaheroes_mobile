import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View className="flex flex-row justify-between items-center  w-full py-1 pb-2 bg-white" style={[styles.card, styles.shadowProp]}>
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
          className={` flex items-center justify-center  rounded-xl p-1 mx-5  ${isFocused ? ' bg-cyan-600' : ''}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
          <MaterialCommunityIcons name={getIconName(label)} color={isFocused ? 'white' : '#a7d6db'} size={25} />
            <Text className={` text-xs font-bold ${isFocused? " text-white":" text-[#a7d6db]"}`}>
              {label}
            </Text>
          </TouchableOpacity>
          //clipboard-list
          //account-cog
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 0,
    width: '100%',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});