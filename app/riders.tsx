import { useCoordsStore } from "@/components/store/coords";
import { Text } from "@/components/ui";
import { AntDesign } from "@expo/vector-icons";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, ToastAndroid, View } from "react-native";
import tw from "twrnc";

const RIDERS = [
  {
    name: "Ram Bahadur Gurung",
    vehicle: "Maruti Suzuki",
    price: 450,
    image: require("@/assets/images/car.png"),
  },
  {
    name: "Kumar Magar",
    vehicle: "Suzuki Splender",
    price: 4250,
    image: require("@/assets/images/bike.png"),
  },
  {
    name: "Arjun Adhikari",
    vehicle: "Royal Enfield",
    price: 4450,
    image: require("@/assets/images/bullet.png"),
  },
];

export default function Riders() {
  const router = useRouter();
  const { resetFinalPlot, finalPlot } = useCoordsStore();

  const [selectedRider, setSelectedRider] = useState<{
    name: string;
    vehicle: string;
    price: number;
    image: any;
  } | null>(null);

  return (
    <BottomSheetView>
      <View style={tw` h-full w-full px-4 bg-white `}>
        <View style={tw`flex flex-row justify-center items-center`}>
          <Pressable
            onPress={() => {
              if (finalPlot) {
                resetFinalPlot();
              }
              router.back();
            }}
            style={tw` flex-1 flex flex-row items-center gap-2`}
          >
            <AntDesign name="arrowleft" size={24} color="rgb(37 99 235)" />
            <Text className=" text-xl text-blue-600">Back</Text>
          </Pressable>
          <Text bold className="text-xl text-center flex-1">
            Riders
          </Text>
          <AntDesign
            name="user"
            size={24}
            color="white"
            style={tw`text-center flex-1`}
          />
        </View>
        <ScrollView style={tw`mt-4`}>
          {RIDERS.map((rider, index) => (
            <View
              key={index + `${rider.name}`}
              style={tw`border  border-gray-300 rounded-2xl mt-2 overflow-hidden ${
                selectedRider?.name === rider.name
                  ? "bg-blue-100 border-blue-100"
                  : ""
              }`}
            >
              <Pressable
                onPress={() => {
                  setSelectedRider(rider);
                }}
                android_ripple={{ color: "#00000020", borderless: false }}
                style={tw`p-3`}
              >
                <View style={tw`flex flex-row gap-4 items-center`}>
                  <View style={tw`bg-gray-100 rounded-2xl w-18 h-18`}>
                    <Image source={rider.image} style={tw`w-18 h-18`} />
                  </View>
                  <View style={tw`w-40`}>
                    <Text semiBold className="text-lg">
                      {rider.name}
                    </Text>
                    <Text className="text-xs">{rider.vehicle} </Text>
                  </View>
                  <View style={tw`flex-1 justify-end items-end`}>
                    <Text semiBold className="text-lg mr-2 text-green-700">
                      Rs. {rider.price}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </View>
          ))}
          <Pressable
            onPress={() => {
              if (selectedRider) {
                router.push("confirmation");
              } else {
                // toast error
                ToastAndroid.show("Please select a rider.", ToastAndroid.SHORT);
              }
            }}
            style={tw`bg-[#14181E] mt-5 p-3 rounded-xl`}
          >
            <Text className="text-lg text-white text-center">Book Ride</Text>
          </Pressable>
        </ScrollView>
      </View>
    </BottomSheetView>
  );
}
