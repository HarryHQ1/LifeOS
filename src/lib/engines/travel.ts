/**
 * ENGINE 5 — TRAVEL ENGINE (/lib/engines/travel.ts)
 * Activates across all apps when user mentions travel.
 */

export const detectTravel = async (message: string): Promise<any> => {
  try {
    const response = await fetch("/api/engines/travel/detect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    return await response.json();
  } catch (error) {
    console.error("Travel Engine Error:", error);
    return { isTravelIntent: false };
  }
};

export const planTrip = async (
  destination: string,
  dates: any,
  budget?: number
): Promise<any> => {
  try {
    const response = await fetch("/api/engines/travel/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination, dates, budget }),
    });
    return await response.json();
  } catch (error) {
    console.error("Travel Engine Error:", error);
    throw error;
  }
};

export const generateChecklist = async (trip: any): Promise<any> => {
  try {
    const response = await fetch("/api/engines/travel/checklist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trip }),
    });
    return await response.json();
  } catch (error) {
    console.error("Travel Engine Error:", error);
    throw error;
  }
};

export const activateTravelMode = (trip: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("lifeos_travel_mode", JSON.stringify(trip));
  }
  console.log("Travel mode activated for", trip.destination);
};
