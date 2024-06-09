import * as Location from "expo-location";

interface Coordinates {
  latitude: number;
  longitude: number;
  heading?: number | null; // Heading is optional since it may not always be provided
}

export const getCurrentLocation = async (): Promise<Coordinates> => {
  try {
    // Request permission to access location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Location permission not granted");
    }

    // Get the current position
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const coords: Coordinates = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      heading: location.coords.heading,
    };
    return coords;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
