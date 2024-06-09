import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

export const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  //#region styles
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    // @ts-ignore
    borderRadius: 18,
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      ["#1E40AF", "#1E40AF"]
    ),
  }));
  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle]
  );
  //#endregion

  // render
  return <Animated.View pointerEvents="none" style={containerStyle} />;
};
