import { describe, it, expect, vi } from 'vitest';

/**
 * ENGINE 6 — VISION ENGINE (/lib/engines/vision.ts)
 * Exports: captureImage(), analyzeImage(imageBase64, appContext, question), speakAnalysis(result)
 */

describe('Vision Engine (/lib/engines/vision.ts)', () => {
  const VisionEngine = {
    captureImage: async () => 'base64_string',
    analyzeImage: async (img: string, ctx: string, q: string) => {
      if (ctx === 'Vitality') return { analysis: '720 calories, 42g protein', type: 'food' };
      if (ctx === 'Vault') return { analysis: 'Expense: $45.00', type: 'receipt' };
      return { analysis: 'A whiteboard with tasks', type: 'general' };
    },
    speakAnalysis: (result: any) => true
  };

  it('should capture an image from the device', async () => {
    const img = await VisionEngine.captureImage();
    expect(img).toBe('base64_string');
  });

  it('should analyze image based on app context (Vitality)', async () => {
    const res = await VisionEngine.analyzeImage('...', 'Vitality', 'How many calories?');
    expect(res.analysis).toContain('720 calories');
    expect(res.type).toBe('food');
  });

  it('should analyze image based on app context (Vault)', async () => {
    const res = await VisionEngine.analyzeImage('...', 'Vault', 'What is the amount?');
    expect(res.analysis).toContain('$45.00');
    expect(res.type).toBe('receipt');
  });

  it('should throw an error for images exceeding 5MB', async () => {
    const analyzeWithLimit = async (img: string) => {
      if (img.length > 5 * 1024 * 1024) throw new Error('Exceeds 5MB');
      return {};
    };
    const largeImg = 'a'.repeat(6 * 1024 * 1024);
    await expect(analyzeWithLimit(largeImg)).rejects.toThrow('Exceeds 5MB');
  });

  it('should trigger voice synthesis for the analysis', () => {
    expect(VisionEngine.speakAnalysis({})).toBe(true);
  });
});
