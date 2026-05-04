/**
 * ENGINE 3 — TEACHING ENGINE (/lib/engines/teaching.ts)
 * 60-second voice lessons on anything the user needs to know.
 */

export interface Lesson {
  id?: string;
  topic: string;
  content: string;
  duration: number;
}

export const suggestLesson = async (topic: string): Promise<Lesson> => {
  try {
    const response = await fetch("/api/engines/teaching/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    return await response.json();
  } catch (error) {
    console.error("Teaching Engine Error:", error);
    throw error;
  }
};

export const deliverLesson = async (topic: string): Promise<Lesson> => {
  try {
    const response = await fetch("/api/engines/teaching/deliver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    return await response.json();
  } catch (error) {
    console.error("Teaching Engine Error:", error);
    throw error;
  }
};

export const saveLesson = async (lesson: Lesson): Promise<any> => {
  try {
    const response = await fetch("/api/engines/teaching/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lesson }),
    });
    return await response.json();
  } catch (error) {
    console.error("Teaching Engine Error:", error);
    throw error;
  }
};

export const getLessons = async (userId: string): Promise<Lesson[]> => {
  try {
    const response = await fetch(`/api/engines/teaching/list?userId=${userId}`);
    return await response.json();
  } catch (error) {
    console.error("Teaching Engine Error:", error);
    return [];
  }
};
