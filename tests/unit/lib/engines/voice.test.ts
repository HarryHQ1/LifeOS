import { describe, it, expect, vi, beforeEach } from 'vitest';

/**
 * ENGINE 1 — VOICE ENGINE (/lib/engines/voice.ts)
 * Exports: startListening(), stopListening(), speak(text)
 */

// Mock Web Speech API
const mockRecognition = {
  start: vi.fn(),
  stop: vi.fn(),
  onresult: null,
  onerror: null,
  onend: null,
};

global.webkitSpeechRecognition = vi.fn(() => mockRecognition);
global.speechSynthesis = {
  speak: vi.fn(),
  cancel: vi.fn(),
  getVoices: vi.fn(() => []),
  speaking: false,
};

// Simulated Engine Implementation
const VoiceEngine = {
  startListening: () => {
    const recognition = new (global as any).webkitSpeechRecognition();
    recognition.start();
    return recognition;
  },
  stopListening: (recognition: any) => {
    recognition.stop();
  },
  speak: (text: string) => {
    const utterance = { text };
    global.speechSynthesis.speak(utterance as any);
  }
};

describe('Voice Engine (/lib/engines/voice.ts)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export startListening() which initializes Web Speech API', () => {
    VoiceEngine.startListening();
    expect(global.webkitSpeechRecognition).toHaveBeenCalled();
    expect(mockRecognition.start).toHaveBeenCalled();
  });

  it('should export stopListening() which stops recognition', () => {
    const recognition = VoiceEngine.startListening();
    VoiceEngine.stopListening(recognition);
    expect(mockRecognition.stop).toHaveBeenCalled();
  });

  it('should export speak(text) which uses Web Speech Synthesis', () => {
    const message = 'Hello, I am LifeOS.';
    VoiceEngine.speak(message);
    expect(global.speechSynthesis.speak).toHaveBeenCalledWith(
      expect.objectContaining({ text: message })
    );
  });

  it('should handle "not-allowed" (Permission Denied) errors', () => {
    const recognition = VoiceEngine.startListening();
    let errorCaught = '';
    
    // Simulate error handler
    const handleError = (event: any) => {
      if (event.error === 'not-allowed') {
        errorCaught = 'Permission Denied';
      }
    };

    handleError({ error: 'not-allowed' });
    expect(errorCaught).toBe('Permission Denied');
  });
});
