import axios from "axios";

export const getPath = async ({
  currentLatitude,
  currentLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  currentLatitude: number;
  currentLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
}) => {
  const response = await axios.get("http:192.168.1.86:6969/path", {
    params: {
      currentLatitude,
      currentLongitude,
      destinationLatitude,
      destinationLongitude,
    },
  });
  return response.data;
};
