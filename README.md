LifeOS
Your Personal Life Operating System
The Comprehensive Master Prompt
9 Apps  |  7 Shared Engines  |  Voice First  |  AI Powered  |  March 2026

The Comprehensive LifeOS Platform Prompt
This is the single master prompt that defines the entire LifeOS platform. Use it to explain the project to anyone — a developer, an investor, a partner, or to start a fresh conversation with Claude Code about the entire platform.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THE COMPREHENSIVE LIFEOS PLATFORM PROMPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Build LifeOS — a voice-first, vision-enabled, AI-powered personal
life operating system that manages every area of a person's daily
life through natural conversation, image analysis, deep research,
intelligent teaching, precise calculation, and smart location
discovery — all spoken out loud and powered by Claude AI.

═══════════════════════════════════════════════════════════════
PLATFORM IDENTITY
═══════════════════════════════════════════════════════════════

Name: LifeOS
Tagline: Your Personal Life Operating System
Positioning: Not an AI assistant. Not a productivity app.
             Your personal operating system for life.
Core promise: Here is exactly what to do today.

LifeOS is built as 9 standalone apps — each solving a specific
life problem — tested individually then united into one platform.
Every app shares 7 common engines built once and reused forever.

═══════════════════════════════════════════════════════════════
THE 9 APPS
═══════════════════════════════════════════════════════════════

APP 1 — MOMENTUM (Work and Productivity)
Tagline: Stop wondering what to do next. Just do it.
Solves: Overwhelm, missed deadlines, no clarity on priorities
Core: AI daily plan, voice task capture, productivity research

APP 2 — SERENITY (Mind and Mental Wellness)
Tagline: Your mind deserves the same care as everything else.
Solves: Anxiety, stress, mental load, emotional overwhelm
Core: Daily mood check-in, stress detection, voice journaling

APP 3 — VITALITY (Health and Body)
Tagline: Small daily habits. Massive long-term results.
Solves: Forgotten medications, poor sleep, no movement habits
Core: Medication reminders, hydration, sleep, exercise tracking

APP 4 — NEST (Home and Family)
Tagline: Everything your home needs, handled by voice.
Solves: Forgotten errands, missed appointments, household chaos
Core: Task management, grocery lists, family calendar, errands

APP 5 — VAULT (Money and Finance)
Tagline: Your money, organized. Your future, planned.
Solves: Missed bill payments, forgotten subscriptions, no budget
Core: Bill tracker, subscription monitor, spending feedback

APP 6 — BOND (Relationships and People)
Tagline: Never lose touch with the people who matter most.
Solves: Missed birthdays, weakening relationships, loneliness
Core: Birthday reminders, check-in prompts, conversation memory

APP 7 — ELEVATE (Learning and Growth)
Tagline: Learn something new every single day.
Solves: No learning habit, goals never started, no accountability
Core: Goal setting, daily lessons, skill tracking, accountability

APP 8 — ORACLE (Research and Information)
Tagline: Ask anything. Get the full picture.
Solves: Information overload, bad decisions, no time to research
Core: Deep research, image analysis, fact checking, trend reports

APP 9 — ASCEND (Career and Business)
Tagline: Build the career and business you actually want.
Solves: No career direction, missed opportunities, juggling roles
Core: Career planning, opportunity tracker, industry research

═══════════════════════════════════════════════════════════════
THE 7 SHARED ENGINES — BUILT ONCE, USED BY ALL 9 APPS
═══════════════════════════════════════════════════════════════

All 7 engines live in /lib/engines/ and are never rebuilt.
Every app imports from this folder. No exceptions.

ENGINE 1 — VOICE ENGINE (/lib/engines/voice.ts)
Full two-way voice conversation with the user.
- Input: Web Speech API with Whisper API fallback
- Output: Web Speech Synthesis API — free, browser native
- Always listening state with one-tap mic button
- Speaks every response aloud when voice mode is on
- Handles permissions, errors, and mobile browser differences
- Exports: startListening(), stopListening(), speak(text)

ENGINE 2 — RESEARCH ENGINE (/lib/engines/research.ts)
Deep research on any topic — past, present, and future.
- Uses Claude API with web search tool enabled
- Always covers: historical context, current state,
  future predictions, what this means for the user
- Auto-triggers based on user tasks and context
- Returns structured ResearchCard objects
- Exports: research(topic, appContext, userContext)

ENGINE 3 — TEACHING ENGINE (/lib/engines/teaching.ts)
60-second voice lessons on anything the user needs to know.
- AI suggests lessons based on user activity
- User always decides yes or no — never forced
- Lesson designed to be spoken in exactly 60 seconds
- User can say 'tell me more' to go deeper
- All lessons saved to personal library for replay
- Exports: suggestLesson(topic), deliverLesson(topic),
  saveLesson(lesson), getLessons(userId)

ENGINE 4 — LOCATION ENGINE (/lib/engines/location.ts)
Finds any place near the user and navigates them there.
- Browser Geolocation API for current location
- Google Places API for all 13 place categories:
  Transport, Accommodation, Food, Health, Shopping,
  Education, Events, Finance, Services, Community,
  Nature, Real Estate, Career venues
- Google Maps API for display and routing
- Voice-guided turn-by-turn directions spoken aloud
- Context-aware: adds relevant info based on which app
- Exports: findNearby(placeType, filters),
  getDirections(destination), startNavigation(route)

ENGINE 5 — TRAVEL ENGINE (/lib/engines/travel.ts)
Activates across all apps when user mentions travel.
- Detects travel intent in any conversation automatically
- Searches affordable flights via Amadeus API
- Finds hotels and accommodation options
- Builds complete day-by-day itinerary
- Generates smart forget-nothing checklist:
  Passport validity, visa requirements, travel insurance,
  online check-in timing, medications, foreign currency,
  power adapters, vaccines, emergency contacts
- Fires reminders at exactly the right time before departure
- Adjusts all reminders to destination timezone
- Each of the 9 apps adapts for travel when active:
  Momentum: reschedules tasks around trip
  Vault: switches to travel budget mode
  Vitality: activates travel health reminders
  Nest: activates away mode
  Serenity: travel anxiety support
  Bond: timezone reminders for contacts
  Elevate: destination culture lessons
  Oracle: destination deep research
  Ascend: professional events at destination
- Exports: detectTravel(message), planTrip(destination,
  dates, budget), generateChecklist(trip),
  activateTravelMode(trip)

ENGINE 6 — VISION ENGINE (/lib/engines/vision.ts)
Reads any photo, image, or screenshot and responds.
- Opens device camera or accepts photo upload
- Converts image to base64 format
- Sends image and app context to Claude Vision API
- Response shaped by which app is active:
  Vitality: calories, nutrients, health score from food photo
  Vault: expense amount extracted from receipt photo
  Momentum: tasks extracted from whiteboard photo
  Nest: meal suggestions from fridge photo
  Oracle: full research report on any image
  Ascend: business insights from chart or graph photo
  Any app: reads text, explains diagrams, identifies objects
- Speaks the analysis using Voice Engine
- Saves analysis to conversation history
- Can read: food and meals, documents, handwriting,
  charts and graphs, products, medical reports,
  receipts and bills, screenshots, barcodes, scenes
- Exports: captureImage(), analyzeImage(imageBase64,
  appContext, question), speakAnalysis(result)

ENGINE 7 — CALCULATOR ENGINE (/lib/engines/calculator.ts)
Calculates exactly what the user needs to reach any goal.
- User states a GOAL and available RESOURCES
- Engine calculates what is needed to bridge the gap
- Works across ALL domains without manual configuration:
  Food: photo or describe a meal, get exact calorie count
        state a calorie target, get exact ingredients needed
        show what you have in the fridge, get meal options
        scale any recipe to any number of servings
  Fitness: calories to burn, workout needed, weight loss plan
  Finance: savings target, daily amount needed, debt payoff
  Time: project deadline, daily hours required, schedules
  Building: room dimensions, exact materials and quantities
  Health: water intake, vitamin dosages, medication spacing
  Business: revenue target, sales needed, pricing, break even
  Travel: fuel cost, budget allocation, luggage weight limits
- Returns 3 formats for every calculation:
  EXACT: the precise quantity needed
  RANGE: minimum and maximum range
  ALTERNATIVES: 2-3 different ways to reach the same goal
- Mode 1 — Goal First: tell it what you want,
  it calculates what you need to get there
- Mode 2 — Resources First: tell it what you have,
  it tells you every goal achievable with those resources
- Speaks every result using Voice Engine
- Exports: calculate(goal, resources, domain),
  calculateFromResources(resources, domain)

═══════════════════════════════════════════════════════════════
FEATURES IN EVERY APP
═══════════════════════════════════════════════════════════════

Every one of the 9 apps includes all of these:

VOICE CONVERSATION
- User speaks naturally — no commands to memorize
- App listens, understands, acts, and speaks back
- Mic button always visible — one tap away
- Text input always available as fallback

MORNING GREETING
- Voice mode: app speaks the daily summary aloud
- Silent mode: visual dashboard only
- Both: visual plus play button
- User sets preference in onboarding, changes anytime

PHOTO AND IMAGE READING (Vision Engine)
- Camera button always accessible
- Point at anything — get an instant intelligent response
- Response tailored to whichever app is active

DEEP RESEARCH (Research Engine)
- Automatic: triggers based on user activity
- Manual: user asks by voice or text
- Always covers past, present, and future
- Structured cards saved for later reference

60-SECOND LESSONS (Teaching Engine)
- AI suggests when relevant — user always decides
- Spoken aloud — learn while doing other things
- Saved to personal library — replay anytime
- User can go deeper with 'tell me more'

LOCATION DISCOVERY (Location Engine)
- Find any place by voice — one natural sentence
- 13 categories covering every daily need
- Map display with distance and ratings
- Voice-guided directions spoken turn by turn
- Context-aware — adds relevant tips per app

TRAVEL MODE (Travel Engine)
- Activates when travel mentioned — no setup needed
- Full trip planning, tickets, itinerary, checklist
- Forget-nothing reminders at the right times
- All apps adapt simultaneously for the trip

GOAL CALCULATOR (Calculator Engine)
- Works for food, fitness, finance, time, building,
  health, business, and travel calculations
- Exact, range, and alternative results
- Goal-first and resources-first modes
- Results spoken aloud instantly

SMART REMINDERS
- Browser push notifications
- Fires at optimal times based on task type
- Spoken aloud when app is open
- Never fires outside user's set work hours

═══════════════════════════════════════════════════════════════
TECH STACK — IDENTICAL ACROSS ALL 9 APPS
═══════════════════════════════════════════════════════════════

Framework:     Next.js 14 with App Router
Language:      TypeScript — strict mode always on
Styling:       Tailwind CSS + shadcn/ui components
Design:        Dark mode default — mobile first always
Database:      PostgreSQL with Prisma ORM
Auth:          NextAuth.js — email magic link + Google
AI Brain:      Anthropic Claude API
               Model: claude-sonnet-4-20250514
Vision:        Claude Vision API (built into Claude API)
Research:      Claude API with web search tool enabled
Voice Input:   Web Speech API + Whisper API fallback
Voice Output:  Web Speech Synthesis API — free
Maps:          Google Maps JavaScript API
Places:        Google Places API
Directions:    Google Maps Directions API
Location:      Browser Geolocation API — free
Flights:       Amadeus API — free tier
Events:        Eventbrite API — free tier
Notifications: Browser Push Notifications — free
Deployment:    Vercel — free tier
Database host: Neon.tech — free tier

═══════════════════════════════════════════════════════════════
DATABASE SCHEMA — SHARED ACROSS ALL 9 APPS
═══════════════════════════════════════════════════════════════

13 shared tables used by all apps:

User           — profile, preferences, settings
Task           — title, deadline, priority, energy, status
Reminder       — type, fire time, delivered status
ResearchCard   — topic, summary, facts, sources, outlook
Lesson         — topic, content, duration, play count
Conversation   — role, content, app context, image flag
MoodLog        — score, energy, stress, triggers
Trip           — destination, dates, budget, itinerary
SavedLocation  — place, category, coordinates, notes
FinanceItem    — type, amount, due date, recurrence
Contact        — name, birthday, health score, notes
Goal           — title, milestones, progress, status
CalculationLog — goal, resources, domain, results

═══════════════════════════════════════════════════════════════
DESIGN RULES — NEVER BREAK THESE
═══════════════════════════════════════════════════════════════

1.  Dark mode default on every component
2.  Mobile first — design for 375px screen minimum
3.  Mic button always visible — one tap away always
4.  Camera button always within 2 taps
5.  No forms anywhere in the app — voice is primary
6.  Every action confirmed by voice when in voice mode
7.  Text input always available as silent fallback
8.  Responses spoken AND shown — never one without other
9.  Maximum 3 taps to reach any feature
10. No onboarding tutorials — app explains itself by voice

═══════════════════════════════════════════════════════════════
SYSTEM PROMPT — THE CORE AI IDENTITY
═══════════════════════════════════════════════════════════════

Every app uses a version of this system prompt.
Replace [APP NAME] and [APP PURPOSE] per app.

You are [APP NAME] — part of the LifeOS platform.
You are a focused, calm, brilliant personal assistant,
researcher, tutor, navigator, and life calculator.

You know the user's complete life context at all times:
their tasks, goals, health habits, finances, relationships,
location, travel plans, mood, and learning progress.

Your seven core capabilities:

1. ASSIST — manage [APP PURPOSE] proactively.
   Always tell the user exactly what to do next.
   Never wait to be asked. Surface what matters.

2. RESEARCH — use web search for every relevant topic.
   Always cover: what happened before, what is true now,
   and what experts predict will happen next.
   Structure as: Summary, Facts, Sources, Future, Action.

3. TEACH — offer 60-second voice lessons when relevant.
   Always ask permission first. Never force a lesson.
   Keep it to exactly 60 seconds when spoken aloud.
   End with: 'Want me to go deeper on any part of that?'

4. NAVIGATE — find any place the user needs.
   Speak directions turn by turn.
   Add context relevant to this app and this user.

5. TRAVEL — when travel is mentioned, activate fully.
   Find tickets. Build itinerary. Fire smart reminders.
   Adjust this app's behavior for the duration of the trip.

6. SEE — read any photo the user shares.
   Analyze it through the lens of this app's purpose.
   Speak the analysis. Take action if needed.

7. CALCULATE — work out exact quantities for any goal.
   Accept goal or resources as starting point.
   Return exact, range, and alternatives.
   Always ask: 'Want me to build a plan around this?'

Voice and tone:
Speak like a trusted advisor who knows the user deeply.
Direct. Warm. Never robotic. Never wasteful with words.
Never say 'certainly' or 'of course' or 'great question'.
Just answer. Just help. Just act.

═══════════════════════════════════════════════════════════════
EXAMPLE CONVERSATIONS — WHAT LIFEOS FEELS LIKE
═══════════════════════════════════════════════════════════════

EXAMPLE 1 — Food and Calories (Vitality)
User: [Takes photo of plate of jollof rice and chicken]
LifeOS: I can see jollof rice with grilled chicken and
        fried plantain. That is approximately 720 calories.
        Protein is strong at 42 grams. The rice is high
        carb — if you are watching blood sugar, a smaller
        portion next time would help. Want me to log this?

EXAMPLE 2 — Cooking Calculator (Vitality)
User: I want to cook dinner for 6 people at 500 calories each
LifeOS: For 6 people at 500 calories each you need 3,000
        calories total. Here is a jollof rice and chicken
        recipe that hits exactly that:
        Rice: 600g dry weight
        Chicken breast: 900g
        Tomatoes: 8 medium
        Onions: 3 large
        Cooking oil: 4 tablespoons
        That gives 498 calories per person.
        Want me to add the ingredients to your shopping list?

EXAMPLE 3 — Morning Greeting (Momentum)
LifeOS: Good morning James. It is Monday the 20th.
        You have 8 tasks. Here are your top 3 for today:
        First: finish the client proposal — it is due
        tomorrow and has the highest impact.
        Second: call the accountant — you have been
        pushing this for 3 days.
        Third: review the team report — takes 20 minutes
        and clears your afternoon.
        Also — your research on investor trends from
        Friday is ready to review.
        Ready to start?

EXAMPLE 4 — Vision Research (Oracle)
User: [Uploads screenshot of a financial news chart]
LifeOS: This chart shows US inflation from 2020 to 2025.
        It peaked at 9.1% in June 2022 — the highest in
        40 years — then declined steadily to 2.4% by
        late 2024. The sharp rise was driven by supply
        chain disruptions and energy prices post-pandemic.
        Current forecasts suggest it will stabilize between
        2% and 3% through 2026. Want a full research report
        on how this affects your personal finances?

EXAMPLE 5 — Travel Activation (Any App)
User: I need to fly to London for a conference on March 20th
LifeOS: Travel mode activated for London March 20th.
        I found flights from $340 return — cheapest is
        Air France via Paris departing 7am.
        I have also:
        - Rescheduled your non-urgent tasks around the trip
        - Started your forget-nothing checklist
        - Found 3 hotels under $120 near the conference
        - Set a reminder to check in online on March 19th
        Your passport is valid — I checked based on the
        expiry date you shared. No visa needed for UK
        with your passport. Want the full itinerary now?

EXAMPLE 6 — Location Discovery (Any App)
User: Find me the nearest hospital right now
LifeOS: The nearest hospital is St Mary's Medical Center
        — 1.2 miles away. It is open 24 hours.
        Starting navigation now.
        Head north on Main Street for 0.4 miles.
        Then turn right onto Park Avenue.
        Also — bring your insurance card and a list
        of any medications you are currently taking.

EXAMPLE 7 — Teaching (Elevate)
User: Teach me how compound interest works
LifeOS: Here is your 60-second lesson on compound interest.
        Compound interest means you earn interest not just
        on your original money — but also on the interest
        you already earned. Example: you invest $1,000 at
        10% per year. Year 1 you earn $100. Year 2 you earn
        10% on $1,100 — that is $110. By year 10 your
        $1,000 has grown to $2,594 without adding anything.
        The longer you leave it the faster it grows.
        Einstein called it the eighth wonder of the world.
        Want me to calculate how much your savings would
        grow with compound interest at your current rate?

EXAMPLE 8 — Building Calculator (Nest)
User: I want to paint my living room — it is 5 meters by 4
LifeOS: For a 5 by 4 meter room with standard 2.4 meter
        ceilings you have approximately 44 square meters
        of wall space. For two coats you need:
        Exactly: 5.5 litres of paint
        Range: 5 to 6 litres depending on wall texture
        You will also need: 1 large roller, 1 small brush
        for edges, 1 tray, and painter's tape.
        Estimated cost at average paint prices: $65 to $90.
        Want me to find the nearest hardware store?

═══════════════════════════════════════════════════════════════
BUILD STRATEGY — HOW TO BUILD LIFEOS
═══════════════════════════════════════════════════════════════

PHASE 1 — Build Momentum (App 1) completely
This app contains all 7 engines.
Every engine built here is reused in Apps 2 through 9.
Estimated time: 2 to 4 weeks with Claude Code.

PHASE 2 — Launch Momentum to real users
Get 10 to 50 real people using it.
Collect feedback on what works and what is missing.
Use that feedback to improve before building App 2.

PHASE 3 — Build Apps 2 through 9 one at a time
Each app after Momentum takes 1 to 2 weeks.
The engines are already built — just import and use.
Each new app only needs its own screens and logic.

PHASE 4 — Unite all 9 apps into one platform
Single login works across all apps.
Shared navigation between all 9.
One daily dashboard showing all life areas.
One subscription covers everything.

TOTAL ESTIMATED TIME: 3 to 4 months for all 9 apps.

═══════════════════════════════════════════════════════════════
LEGAL AND COMPLIANCE — ALWAYS FOLLOW THESE RULES
═══════════════════════════════════════════════════════════════

Health features: Always say reminders and suggestions.
Never say medical advice or medical diagnosis.
Include disclaimer: This is not a substitute for
professional medical advice.

Finance features: Bill reminders and spending feedback only.
Never say investment advice or financial recommendation.

Calorie and nutrition: Always say approximately.
Never guarantee exact values from food photos.

Data privacy: Comply with GDPR and CCPA.
Collect only what is necessary.
Never sell user data.
Clear privacy policy required before launch.

AI disclosure: Always be transparent that suggestions
come from AI — not a licensed professional.

═══════════════════════════════════════════════════════════════
ARCHITECTURE RULES — ALWAYS FOLLOW THESE
═══════════════════════════════════════════════════════════════

1. All 7 engines in /lib/engines/ — never duplicate
2. All shared database tables — never create app-specific
   duplicates of shared data
3. Auth system identical across all 9 apps
4. Design system identical — same colors, fonts, components
5. TypeScript strict mode always on — no any types
6. All API keys in .env.local — never hardcode
7. Comment every function in plain English
8. Mobile first — test on 375px width before desktop
9. Dark mode default on every component
10. Every new app starts with: import engines from
    /lib/engines/ — never rebuild what already exists

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


How to Use This Prompt

Use 1 — Starting a Fresh Claude Code Session
If you ever start a new Claude Code session and Claude Code has forgotten the project — paste this entire prompt as your first message. It will rebuild its full understanding of LifeOS instantly.

Use 2 — Explaining LifeOS to Anyone
If a developer, investor, or partner asks what LifeOS is — share this document. Every detail they need to understand the entire platform is here in one place.

Use 3 — Building Apps 2 Through 9
When starting each new app after Momentum — begin by pasting this master prompt followed by:
The 7 shared engines are already built in /lib/engines/
The database schema is already live.
The auth system is already working.

Now build [APP NAME] — App [NUMBER] of 9.
Import all engines from /lib/engines/
Do not rebuild anything that already exists.
Build only the screens and logic specific to [APP NAME].

Refer to the [APP NAME] document for full feature details.

Use 4 — Pitching LifeOS
If you ever need to explain LifeOS in one sentence:
"LifeOS is the only app that manages every area of your life, teaches you anything you want to learn, finds anything near you, plans your travel, reads anything you show it, and calculates exactly what you need — all by voice."


Complete Platform Summary

Element	Detail
Platform name	LifeOS — Your Personal Life Operating System
Number of apps	9 standalone apps built individually then united into one platform
Shared engines	7 engines: Voice, Research, Teaching, Location, Travel, Vision, Calculator
Primary input	Voice — speak naturally, app listens and acts. Text always available as fallback.
AI model	Anthropic Claude API — claude-sonnet-4-20250514
Framework	Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Prisma, NextAuth
Database	PostgreSQL via Neon.tech — 13 shared tables across all apps
Deployment	Vercel — free tier covers all 9 apps during build phase
Build tool	Claude Code — non-technical builder, AI does all coding
Budget	Zero upfront — all free tiers until revenue justifies paid plans
Build timeline	3 to 4 months for all 9 apps — App 1 takes longest, rest reuse engines
Target user	Anyone overwhelmed by modern life — professionals, entrepreneurs, parents, students
Core promise	Here is exactly what to do today — proactive, voice-first, context-aware
Legal status	Safe — health as reminders, finance as feedback, full AI disclosure, GDPR/CCPA compliant



LifeOS Comprehensive Master Prompt  |  9 Apps  |  7 Engines  |  March 2026  |  Built with Claude Code
