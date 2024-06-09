import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import tw from "twrnc";
import { History } from "./store/history";
import { Text } from "./ui";
export const HistoryViewComponent = () => {
  const [showComponent1, setShowComponent1] = useState(true);
  const translateX = useSharedValue(0);

  const handleNext = () => {
    translateX.value = withSpring(showComponent1 ? -400 : 0, {
      damping: 57,
      stiffness: 500,
    });
    setShowComponent1(!showComponent1);
  };

  const component2Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value + 400 }],
    };
  });

  return (
    <View>
      <View style={tw`h-96 overflow-hidden`}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {History.map((item, index) => (
            <Animated.View
              style={tw`border mb-2 border-gray-100 rounded-2xl w-full overflow-hidden`}
              key={index}
            >
              <Pressable
                onPress={handleNext}
                style={tw`w-full`}
                android_ripple={{ color: "#00000020", borderless: false }}
              >
                <View style={tw`flex-row justify-between p-2 items-center`}>
                  <MaterialIcons
                    style={tw`ml-0 bg-gray-200 p-2 rounded-full`}
                    name="location-pin"
                    size={24}
                    color="black"
                  />
                  <View style={tw`flex-1`}>
                    <Text className={`flex-1 pl-2 pr-3`} semiBold>
                      {item.address}
                    </Text>
                    <Text className={`flex-1 pl-2 pr-3`}>
                      {item.fullAddress}
                    </Text>
                  </View>
                  <MaterialIcons
                    style={tw`ml-2`}
                    name="keyboard-arrow-right"
                    size={24}
                    color="black"
                  />
                </View>
              </Pressable>
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      <Animated.View style={[tw`absolute w-full h-full`, component2Style]}>
        <View style={tw`bg-blue-50 rounded-xl w-full h-full `}>
          <Pressable
            onPress={handleNext}
            style={tw`absolute top-0 right-0 p-1 z-20 bg-blue-400 rounded-full`}
          >
            <AntDesign name="close" size={24} color="white" />
          </Pressable>
          <View style={tw`border m-2 rounded-xl border-gray-300 mt-4`}>
            <View
              style={tw`flex flex-row items-center gap-5 p-3 border-b border-gray-300 mx-2`}
            >
              <View style={tw`bg-purple-100 rounded-full p-2`}>
                <Feather name="clock" size={20} color="purple" />
              </View>
              <View>
                <Text semiBold className=" text-lg">
                  Thu, June 18, 2024
                </Text>
                <Text className="text-sm">6:30 PM - 6:40 PM</Text>
              </View>
            </View>
            <View
              style={tw`flex flex-row items-center gap-5 p-3 border-b border-gray-300 mx-2`}
            >
              <View style={tw`bg-purple-100 rounded-full p-2`}>
                <MaterialIcons name="attach-money" size={20} color="black" />
              </View>
              <View>
                <Text semiBold className=" text-lg">
                  रु २५०
                </Text>
                <Text className="text-sm">FonePay</Text>
              </View>
            </View>
            <View
              style={tw`flex flex-row items-center gap-5 p-3 border-b border-gray-300 mx-2`}
            >
              <View style={tw`bg-purple-100 rounded-full p-2`}>
                <AntDesign name="car" size={20} color="black" />
              </View>
              <View>
                <Text semiBold className=" text-lg">
                  Ram Bahadur Gurung
                </Text>
                <View style={tw`flex flex-row gap-0`}>
                  <Entypo name="star" size={20} color="rgb(192 132 252)" />
                  <Entypo name="star" size={20} color="rgb(192 132 252)" />
                  <Entypo name="star" size={20} color="rgb(192 132 252)" />
                  <Entypo name="star" size={20} color="rgb(192 132 252)" />
                </View>
              </View>
            </View>
            <View
              style={tw`flex flex-row items-center gap-5 p-3 border-b border-gray-300 mx-2`}
            >
              <View style={tw`flex flex-col items-center  p-2`}>
                <Entypo
                  name="location-pin"
                  size={20}
                  color="rgb(192 132 252)"
                />
                <Ionicons name="arrow-up-outline" size={10} color="black" />
                <Entypo name="dots-three-vertical" size={10} color="black" />
                <Entypo name="dots-three-vertical" size={10} color="black" />
                <Entypo name="location-pin" size={20} color="gray" />
              </View>
              <View>
                <View style={tw`mb-3`}>
                  <Text semiBold className=" text-xs">
                    Pokhara University
                  </Text>
                  <Text className="text-xs">
                    Dhungepatan Khudi, 33700 Lekhnath
                  </Text>
                </View>
                <View>
                  <Text semiBold className=" text-xs">
                    Home
                  </Text>
                  <Text className="text-xs">Church Road 15, Pokhara</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};
