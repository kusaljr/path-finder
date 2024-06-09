import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import MapView, { MapMarker, MapPressEvent, Polyline } from "react-native-maps";
import tw from "twrnc";
import { getLiveRider } from "./query/get-live-rider";
import { useCoordsStore } from "./store/coords";
import { Text } from "./ui";

export function Map() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["liveRider"],
    queryFn: getLiveRider,
  });

  const {
    currentCoords,
    destinationCoords,
    setCurrentCoords,
    setDestinationCoords,
    finalPlot,
    finalPlotLoading,
    resetFinalPlot,
  } = useCoordsStore();

  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentCoords(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const handlePress = (e: MapPressEvent) => {
    const coordinate = e.nativeEvent.coordinate;

    setDestinationCoords(coordinate.latitude, coordinate.longitude);
    resetFinalPlot();
  };

  useEffect(() => {
    if (finalPlot && mapRef.current) {
      mapRef.current.fitToCoordinates(
        finalPlot.map((p) => ({
          latitude: p.lat,
          longitude: p.lon,
        })),
        {
          edgePadding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
          },
          animated: true,
        }
      );
    }
  });

  return (
    <View style={tw`flex-1 z-0`}>
      <Spinner
        visible={
          // if finalPlot is not nul
          finalPlotLoading
        }
        textContent={"Loading shortest way..."}
        textStyle={tw`text-white`}
      />
      <MapView
        mapType="mutedStandard"
        ref={mapRef}
        style={tw`flex-1`}
        userInterfaceStyle="dark"
        initialRegion={{
          // kaski lat long latdelata longdelta
          latitude: 28.2096,
          longitude: 83.9856,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handlePress}
      >
        {currentCoords.latitude && currentCoords.longitude && (
          <MapMarker
            tracksViewChanges={false}
            coordinate={{
              latitude: currentCoords.latitude,
              longitude: currentCoords.longitude,
            }}
            title="You"
            description="Your current location"
          >
            <Text className="text-2xl">🏠</Text>
          </MapMarker>
        )}

        {data &&
          data.map((rider: any, index: number) => (
            <MapMarker
              key={index}
              tracksViewChanges={false}
              coordinate={{
                latitude: rider.latitude,
                longitude: rider.longitude,
              }}
            >
              <Text className="text-2xl">🚘</Text>
            </MapMarker>
          ))}

        {destinationCoords.latitude && destinationCoords.longitude && (
          <MapMarker
            tracksViewChanges={false}
            coordinate={{
              latitude: destinationCoords.latitude,
              longitude: destinationCoords.longitude,
            }}
          >
            <Text className="text-2xl">📍</Text>
          </MapMarker>
        )}
        {finalPlot && (
          <Polyline
            coordinates={finalPlot.map((p) => ({
              latitude: p.lat,
              longitude: p.lon,
            }))}
            strokeColor="red"
            strokeWidth={2}
          />
        )}
      </MapView>
    </View>
  );
}
