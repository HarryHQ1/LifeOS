/**
 * ENGINE 6 — VISION ENGINE (/lib/engines/vision.ts)
 * Reads any photo, image, or screenshot and responds.
 */

export const captureImage = async (): Promise<string | null> => {
  if (typeof window === "undefined" || !navigator.mediaDevices) return null;

  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = (rev) => resolve(rev.target?.result as string);
      reader.readAsDataURL(file);
    };
    input.click();
  });
};

export const analyzeImage = async (
  imageBase64: string,
  appContext: string,
  question?: string
): Promise<any> => {
  try {
    const response = await fetch("/api/engines/vision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64, appContext, question }),
    });

    if (!response.ok) {
      throw new Error("Vision analysis failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Vision Engine Error:", error);
    return {
      analysis: "Error analyzing image",
      success: false,
    };
  }
};

export const speakAnalysis = (result: any) => {
  // Uses Voice Engine to speak the analysis
  import("./voice").then((voice) => {
    const textToSpeak = result.analysis || result.message || "Analysis complete";
    voice.speak(textToSpeak);
  });
};
