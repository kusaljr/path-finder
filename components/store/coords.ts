import { create } from "zustand";

interface Coords {
  latitude: number | null;
  longitude: number | null;
}

interface FinalPlot {
  lat: number;
  lon: number;

  id: number;
  type: string;
}

// zustand types for store

interface CoordsStore {
  currentCoords: Coords;
  destinationCoords: Coords;

  setCurrentCoords: (latitude: number, longitude: number) => void;
  setDestinationCoords: (latitude: number, longitude: number) => void;

  finalPlot: FinalPlot[] | null;
  resetCoords: () => void;
  setFinalPlot: (finalPlot: FinalPlot[]) => void;

  finalPlotLoading: boolean;
  setFinalPlotLoading: (loading: boolean) => void;
  resetFinalPlot: () => void;
}

export const useCoordsStore = create<CoordsStore>((set) => ({
  currentCoords: { latitude: null, longitude: null },
  destinationCoords: { latitude: null, longitude: null },

  setCurrentCoords: (latitude: number, longitude: number) =>
    set(() => ({ currentCoords: { latitude, longitude } })),
  setDestinationCoords: (latitude: number, longitude: number) =>
    set(() => ({ destinationCoords: { latitude, longitude } })),
  resetCoords: () =>
    set(() => ({
      currentCoords: { latitude: null, longitude: null },
      destinationCoords: { latitude: null, longitude: null },
    })),

  finalPlot: null,
  setFinalPlot: (finalPlot: FinalPlot[]) => set(() => ({ finalPlot })),
  finalPlotLoading: false,
  setFinalPlotLoading: (loading: boolean) =>
    set(() => ({ finalPlotLoading: loading })),
  resetFinalPlot: () => set(() => ({ finalPlot: null })),
}));
