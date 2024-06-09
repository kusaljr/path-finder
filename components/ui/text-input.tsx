import { TextInput as RnTextInput } from "react-native";
import tw from "twrnc";

interface TextInputProps {
  className: string;
  placeholder: string;
  bold?: boolean;
  semiBold?: boolean;
  value?: string;
}

export const TextInput = (props: TextInputProps) => {
  return (
    <RnTextInput
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
