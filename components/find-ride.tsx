import { Entypo, Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, ToastAndroid, View } from "react-native";
import tw from "twrnc";
import { getPath } from "./query/get-path.query";
import { useCoordsStore } from "./store/coords";
import { Text, TextInput } from "./ui";

export function FindRide() {
  const {
    finalPlotLoading,
    currentCoords,
    destinationCoords,
    setFinalPlotLoading,
    setFinalPlot,
  } = useCoordsStore();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getPath"],
    queryFn: () =>
      getPath({
        currentLatitude: currentCoords.latitude!,
        currentLongitude: currentCoords.longitude!,
        destinationLatitude: destinationCoords.latitude!,
        destinationLongitude: destinationCoords.longitude!,
      }),
    enabled: false,
  });

  const router = useRouter();

  useEffect(() => {
    if (data) {
      setFinalPlot(data);
    }
  }, [data]);

  return (
    <View style={tw`  bg-white rounded-t-3xl`}>
      <View style={tw`bg-[#14181E] p-4 rounded-xl`}>
        <Text semiBold className="text-white text-lg">
          Enter Your Destination
        </Text>
        <Text className="text-gray-400 text-xs">
          Please tell us your drop location!
        </Text>
      </View>

      <View style={tw`flex flex-row mt-5`}>
        <View style={tw`flex flex-col items-center  p-2`}>
          <Entypo name="location-pin" size={20} color="#14181E" />
          <Ionicons name="arrow-up-outline" size={10} color="black" />
          <Entypo name="dots-three-vertical" size={10} color="black" />
          <Entypo name="dots-three-vertical" size={10} color="black" />
          <Entypo name="location-pin" size={20} color="gray" />
        </View>

        <View style={tw`mt-2`}>
          <Text className="">
            {currentCoords.latitude}, {currentCoords.longitude}
          </Text>
          <View style={tw`border-b mt-1 border-gray-300 w-[300px]`} />
          <TextInput
            value={
              destinationCoords.latitude
                ? `${destinationCoords.latitude}, ${destinationCoords.longitude}`
                : ""
            }
            placeholder="Enter your destination"
            className="text-gray-400 text-sm  mt-3 "
          />
        </View>
      </View>

      <View style={tw`flex flex-row justify-center items-center`}>
        <Pressable
          onPress={() => {
            if (!currentCoords.latitude || !currentCoords.longitude) {
              ToastAndroid.show("Please select your current location", 2000);
              return;
            }

            if (!destinationCoords.latitude || !destinationCoords.longitude) {
              ToastAndroid.show(
                "Please select your destination location",
                2000
              );
              return;
            }

            setFinalPlotLoading(true);

            refetch().then(() => {
              setFinalPlotLoading(false);
              router.push("/riders");
            });
          }}
          android_ripple={{
            color: "rgb(55 65 81)",
            borderless: false,
          }}
          style={tw`bg-[#14181E] p-2 rounded-xl mt-3 w-full `}
        >
          <Text className="text-white text-lg text-center">Find Ride</Text>
        </Pressable>
      </View>
    </View>
  );
}

//  <View style={tw`overflow-hidden bg-blue-500 rounded-lg mr-4`}>
//    <Pressable
//      disabled={finalPlotLoading}
//      onPress={() => {
//        if (!currentCoords.latitude || !currentCoords.longitude) {
//          return;
//        }

//        if (!destinationCoords.latitude || !destinationCoords.longitude) {
//          return;
//        }

//        setFinalPlotLoading(true);

//        refetch().then(() => {
//          setFinalPlotLoading(false);
//          router.push("/riders");
//        });
//      }}
//      style={tw`w-full p-2 `}
//      android_ripple={{ color: "#00000020", borderless: false }}
//    >
//      <Text className={`text-white `}>Find Rider</Text>
//    </Pressable>
//  </View>;
