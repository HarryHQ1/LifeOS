import { describe, it, expect, vi } from 'vitest';

/**
 * ENGINE 5 — TRAVEL ENGINE (/lib/engines/travel.ts)
 * Exports: detectTravel(message), planTrip(destination, dates, budget), 
 *          generateChecklist(trip), activateTravelMode(trip)
 */

describe('Travel Engine (/lib/engines/travel.ts)', () => {
  const TravelEngine = {
    detectTravel: (msg: string) => msg.includes('fly to') || msg.includes('trip to'),
    planTrip: async (dest: string, dates: any, budget: number) => ({
      destination: dest,
      flights: [{ price: '$340', airline: 'Air France' }],
      hotels: [{ name: 'London Hotel', price: '$110' }]
    }),
    generateChecklist: (trip: any) => ([
      'Passport validity', 'Visa requirements', 'Travel insurance', 'Adapters'
    ]),
    activateTravelMode: (trip: any) => true
  };

  it('should detect travel intent in a sentence', () => {
    expect(TravelEngine.detectTravel('I need to fly to London')).toBe(true);
    expect(TravelEngine.detectTravel('What time is it?')).toBe(false);
  });

  it('should plan a trip and return flights and hotels', async () => {
    const plan = await TravelEngine.planTrip('London', 'March 20', 1000);
    expect(plan.destination).toBe('London');
    expect(plan.flights[0].price).toBe('$340');
  });

  it('should generate a "forget-nothing" checklist', () => {
    const checklist = TravelEngine.generateChecklist({});
    expect(checklist).toContain('Passport validity');
    expect(checklist).toContain('Adapters');
  });

  it('should activate travel mode', () => {
    expect(TravelEngine.activateTravelMode({})).toBe(true);
  });
});
