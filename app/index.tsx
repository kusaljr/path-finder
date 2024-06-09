import { FindRide } from "@/components/find-ride";
import { HistoryViewComponent } from "@/components/history-view";
import { Text } from "@/components/ui";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import tw from "twrnc";

export default function Home() {
  return (
    <BottomSheetView>
      <View style={tw`w-full h-full bg-white px-4`}>
        <FindRide />
        <View style={tw`border border-gray-300 rounded-xl p-3 mt-4`}>
          <Text semiBold className="text-lg my-2 mx-2">
            Recent
          </Text>
          <HistoryViewComponent />
        </View>
      </View>
    </BottomSheetView>
  );
}
