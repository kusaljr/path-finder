import React from "react";
import { Text as RnText } from "react-native";
import tw from "twrnc";

interface TextProps {
  className: string;
  children: React.ReactNode;
  bold?: boolean;
  semiBold?: boolean;
}

export const Text = (props: TextProps) => {
  return (
    <RnText
      style={[
        tw`${props.className}`,
        {
          fontFamily: props.bold
            ? "Poppins_700Bold"
            : props.semiBold
            ? "Poppins_600SemiBold"
            : "Poppins_400Regular",
        },
      ]}
      {...props}
    />
  );
};
