import { useCoordsStore } from "@/components/store/coords";
import { Text } from "@/components/ui";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image, View } from "react-native";
import tw from "twrnc";

export default function ConfirmationScreen() {
  const { currentCoords, destinationCoords } = useCoordsStore();
  return (
    <BottomSheetView style={tw`bg-blue-800`}>
      <View style={tw`bg-blue-800`}>
        <Text semiBold className="py-1 text-sm text-gray-100 text-center">
          14 minute away, 12:55 PM Arrival Time
        </Text>
      </View>
      <View style={tw`bg-white rounded-3xl  h-full w-full px-4 pt-8`}>
        <View style={tw`flex flex-row justify-between items-center`}>
          <Image
            source={require("@/assets/images/prachanda.jpg")}
            style={tw`w-20 h-20 rounded-full`}
          />

          <View style={tw`flex flex-row items-center gap-1`}>
            <MaterialCommunityIcons name="star" size={24} color="#FFD700" />
            <View>
              <Text semiBold className="text-sm">
                1.2
              </Text>
              <Text className="text-xs text-gray-400">Rating</Text>
            </View>
          </View>
        </View>
        <Text semiBold className="text-xl mt-2 px-1 text-blue-800">
          Comrade Prachanda{" "}
        </Text>
        <Text semiBold className="text-sm px-1">
          is on the way
        </Text>

        <View style={tw`flex flex-row items-center justify-between p-1 mt-3`}>
          <View>
            <Text className="text-sm">12:43 PM Drop Off</Text>
            <Text className="text-xs text-gray-400">
              Affordable rides, all to your self
            </Text>
          </View>

          <View style={tw`-mt-2`}>
            <Text className="text-lg text-right">ग २४ प ३७११ </Text>
            <Text className="text-xs text-gray-400 text-right">
              Licence Plate No.
            </Text>
          </View>
        </View>

        <View style={tw`flex flex-row items-center justify-between p-1 mt-2`}>
          <View>
            <Text semiBold className="text-blue-800">
              +977 9812123232
            </Text>
            <Text className="text-xs text-gray-400">
              Rider's Contact Number
            </Text>
          </View>

          <View style={tw`flex flex-row items-center gap-2`}>
            <View style={tw`bg-blue-800 rounded-full p-1`}>
              <MaterialCommunityIcons name="phone" size={18} color="white" />
            </View>
            <View style={tw`bg-blue-800 rounded-full p-1`}>
              <MaterialCommunityIcons name="message" size={18} color="white" />
            </View>
          </View>
        </View>

        <View style={tw`flex flex-row items-center justify-between p-1 mt-2`}>
          <View>
            <Text semiBold className="text-lg text-blue-800">
              रु ४८०{" "}
            </Text>
            <Text className="text-xs text-gray-400">Total Fare</Text>
          </View>

          <View>
            <Text semiBold className="text-gray-800 text-right">
              Cash on Delivery
            </Text>
            <Text className="text-gray-400 text-xs text-right">
              Payment Mode
            </Text>
          </View>
        </View>

        <View style={tw`mt-2 mx-auto border-b border-gray-300  w-96 `} />

        <View style={tw`flex flex-row gap-7 items-center mt-4`}>
          <View style={tw`flex flex-col items-center  p-2`}>
            <Entypo name="location-pin" size={20} color="#1E40AF" />
            <Ionicons name="arrow-up-outline" size={10} color="black" />
            <Entypo name="dots-three-vertical" size={10} color="black" />
            <Entypo name="dots-three-vertical" size={10} color="black" />

            <Entypo name="dots-three-vertical" size={10} color="black" />
            <Entypo name="dots-three-vertical" size={10} color="black" />
            <Entypo name="dots-three-vertical" size={10} color="black" />

            <Entypo name="dots-three-vertical" size={10} color="black" />

            <Entypo name="dots-three-vertical" size={10} color="black" />
            <Entypo name="location-pin" size={20} color="gray" />
          </View>
          <View>
            <View style={tw`mt-1 flex flex-row gap-2 items-center`}>
              <View>
                <Text className="text-xs text-gray-400">Pickup Point</Text>
                <Text className="text-lg text-gray-800">
                  {currentCoords?.latitude + ", " + currentCoords?.longitude}
                </Text>
              </View>
            </View>
            <View style={tw`mt-9 flex flex-row gap-2 items-center`}>
              <View>
                <Text className="text-xs text-gray-400">Destination</Text>
                <Text className="text-lg text-gray-800">
                  {destinationCoords?.latitude?.toFixed(7) +
                    ", " +
                    destinationCoords?.longitude?.toFixed(7)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </BottomSheetView>
  );
}
