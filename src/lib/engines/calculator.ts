/**
 * ENGINE 7 — CALCULATOR ENGINE (/lib/engines/calculator.ts)
 * Calculates exactly what the user needs to reach any goal.
 */

export type CalculationResult = {
  exact: string;
  range: string;
  alternatives: string[];
};

export const calculate = async (
  goal: string,
  resources: any,
  domain: string
): Promise<CalculationResult> => {
  try {
    const response = await fetch("/api/engines/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal, resources, domain, mode: "goal-first" }),
    });

    if (!response.ok) {
      throw new Error("Calculation failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Calculator Engine Error:", error);
    return {
      exact: "Error performing calculation",
      range: "N/A",
      alternatives: [],
    };
  }
};

export const calculateFromResources = async (
  resources: any,
  domain: string
): Promise<CalculationResult> => {
  try {
    const response = await fetch("/api/engines/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resources, domain, mode: "resources-first" }),
    });

    if (!response.ok) {
      throw new Error("Calculation failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Calculator Engine Error:", error);
    return {
      exact: "Error performing calculation from resources",
      range: "N/A",
      alternatives: [],
    };
  }
};
