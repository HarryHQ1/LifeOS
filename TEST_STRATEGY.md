# LifeOS Test Strategy

## Overview
This document outlines the testing strategy for LifeOS, a personal life operating system consisting of 9 integrated apps and 7 shared engines.

## Test Infrastructure
- **Unit Testing**: Vitest for fast, isolated tests of engines (`/lib/engines`) and shell components.
- **E2E/Integration Testing**: Playwright for cross-engine workflows, UI interactions, and mobile emulation.
- **CI/CD**: GitHub Actions for automated test runs on pull requests.

## Testing Levels

### 1. Engine Unit Tests (`tests/unit/lib/engines`)
Each of the 7 engines must have comprehensive unit tests covering:
- **Voice Engine**: Mocking Web Speech API, testing permission handling, and synthesis triggers.
- **Vision Engine**: Testing Claude Vision API integration with base64 image mocks.
- **Research Engine**: Mocking web search and Claude API responses.
- **Teaching Engine**: Verifying lesson generation and storage logic.
- **Location Engine**: Mocking Geolocation and Google Places APIs.
- **Travel Engine**: Testing trip detection and checklist generation.
- **Calculator Engine**: Verifying goal-first and resources-first calculation modes.

### 2. UI & App Shell Tests (`tests/unit/app/shell`)
- **App Shell**: Verifying dark mode default, persistent mic button visibility, and sidebar navigation.
- **Mobile First**: Using Playwright to emulate iPhone/Android viewports (375px width).

### 3. E2E & Integration Tests (`tests/e2e`)
- **Auth Flow**: NextAuth email magic link and Google OAuth flows.
- **Momentum App**: Reference implementation testing for AI daily plan, voice task capture, and reminders.
- **Cross-Engine Workflows**: Testing how engines interact (e.g., Vision result triggering a Research task).

## Edge Cases to Cover
- No mic/camera permissions.
- Offline mode (Location/Travel engine behavior).
- Rate limiting on Claude/Google APIs.
- Large LLM responses (UI responsiveness).

## Automation
Tests are triggered on:
- Every push to `main`.
- Every Pull Request.
- Nightly scheduled runs for E2E tests.
