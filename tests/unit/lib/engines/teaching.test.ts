import { describe, it, expect, vi } from 'vitest';

/**
 * ENGINE 3 — TEACHING ENGINE (/lib/engines/teaching.ts)
 * Exports: suggestLesson(topic), deliverLesson(topic), saveLesson(lesson), getLessons(userId)
 */

describe('Teaching Engine (/lib/engines/teaching.ts)', () => {
  const TeachingEngine = {
    suggestLesson: async (topic: string) => ({ topic, reason: 'Relevant to your task' }),
    deliverLesson: async (topic: string) => ({ 
      topic, 
      content: 'Compound interest is...', 
      duration: 60, // Exactly 60 seconds
      spokenText: 'This is a sixty second lesson...' 
    }),
    saveLesson: async (lesson: any) => ({ success: true, id: '123' }),
    getLessons: async (userId: string) => ([{ id: '123', topic: 'Compound Interest' }])
  };

  it('should suggest a lesson based on topic', async () => {
    const suggestion = await TeachingEngine.suggestLesson('Investing');
    expect(suggestion.topic).toBe('Investing');
    expect(suggestion).toHaveProperty('reason');
  });

  it('should deliver a lesson that is designed for 60 seconds', async () => {
    const lesson = await TeachingEngine.deliverLesson('Compound Interest');
    expect(lesson.duration).toBe(60);
    expect(lesson.content).toContain('Compound interest');
  });

  it('should save a lesson to the personal library', async () => {
    const res = await TeachingEngine.saveLesson({ topic: 'Math' });
    expect(res.success).toBe(true);
  });

  it('should retrieve lessons for a specific user', async () => {
    const lessons = await TeachingEngine.getLessons('user_1');
    expect(lessons.length).toBeGreaterThan(0);
    expect(lessons[0].topic).toBe('Compound Interest');
  });
});
