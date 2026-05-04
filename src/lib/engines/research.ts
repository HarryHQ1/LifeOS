/**
 * ENGINE 2 — RESEARCH ENGINE (/lib/engines/research.ts)
 * Deep research on any topic — past, present, and future.
 */

export interface ResearchCard {
  topic: string;
  summary: string;
  facts: string[];
  sources: string[];
  outlook: string;
}

export const research = async (
  topic: string,
  appContext: string,
  userContext?: any
): Promise<ResearchCard> => {
  try {
    const response = await fetch("/api/engines/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, appContext, userContext }),
    });

    if (!response.ok) {
      throw new Error("Research failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Research Engine Error:", error);
    return {
      topic,
      summary: "Error performing research",
      facts: [],
      sources: [],
      outlook: "N/A",
    };
  }
};
