import axios from "axios";

export const getLiveRider = async () => {
  const response = await axios.get("http:192.168.1.86:6969/nearest-rider");
  return response.data;
};
