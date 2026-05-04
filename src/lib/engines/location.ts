/**
 * ENGINE 4 — LOCATION ENGINE (/lib/engines/location.ts)
 * Finds any place near the user and navigates them there.
 */

export const findNearby = async (placeType: string, filters?: any) => {
  if (typeof window === "undefined" || !navigator.geolocation) {
    throw new Error("Geolocation not supported");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch("/api/engines/location/nearby", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude, placeType, filters }),
          });
          resolve(await response.json());
        } catch (error) {
          reject(error);
        }
      },
      (error) => reject(error)
    );
  });
};

export const getDirections = async (destination: string) => {
  if (typeof window === "undefined" || !navigator.geolocation) {
    throw new Error("Geolocation not supported");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch("/api/engines/location/directions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              origin: { latitude, longitude },
              destination,
            }),
          });
          resolve(await response.json());
        } catch (error) {
          reject(error);
        }
      },
      (error) => reject(error)
    );
  });
};

export const startNavigation = (route: any) => {
  // Logic to start turn-by-turn navigation
  // This would use Voice Engine to speak directions
  console.log("Starting navigation for route", route);
  import("./voice").then((voice) => {
    voice.speak("Starting navigation. Head north on your current street.");
  });
};
