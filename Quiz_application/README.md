# Quiz Application

A trivia quiz app built with **React**, **TypeScript**, and **Vite**. Players choose a difficulty level, answer 10 questions within a time limit, and can track their best score per difficulty.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Context API (global game state)
- Open Trivia DB API (`opentdb.com`)

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── api/
│   └── apiClient.ts          # Fetches questions from Open Trivia DB API
├── assets/                   # Static assets (images, icons)
├── components/
│   ├── FinishModal.tsx        # Modal shown when the game ends (score summary)
│   ├── Footer.tsx             # App footer
│   ├── LevelSelection.tsx     # Difficulty picker (Easy / Medium / Hard)
│   ├── Modal.tsx              # Generic reusable modal wrapper
│   ├── Score.tsx              # Displays current score during the game
│   ├── StartModal.tsx         # Modal shown on the start screen
│   └── TimeProgressBar.tsx    # Animated countdown progress bar
├── context/
│   ├── QuizContext.tsx        # Context definition + types (gameData, highestScore)
│   └── QuizContextProvider.tsx# Provider that holds and manages game state
├── data/
│   └── questions.json         # Local fallback question bank (Easy / Medium / Hard)
├── pages/
│   ├── CountingPage.tsx       # Countdown screen before questions begin
│   ├── QuestionPage.tsx       # Main quiz screen with question + answer choices
│   └── StartPage.tsx          # Landing / start screen
├── styles/
│   └── styles.tsx             # Shared Tailwind class strings / style helpers
├── types/
│   └── types.ts               # Shared TypeScript interfaces (Question, rawQuestion)
└── utils/
    └── utils.tsx              # Utility / helper functions
```

## Question Data

Questions are loaded from the **Open Trivia DB** REST API at game start:

```
GET https://opentdb.com/api.php?amount=10&category=17&difficulty=<level>
```

- **Category 17** — Science & Nature
- **Difficulty** — `easy`, `medium`, or `hard` (mapped from the selected `Level`)
- Returns 10 multiple-choice questions per round

Raw API responses use the `rawQuestion` shape and are normalised into the internal `Question` format before use:

```ts
// Raw shape from API
interface rawQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

// Normalised shape used in the app
interface Question {
  question: string;
  answers: string[];   // shuffled array of all 4 choices
  correct: string;
}
```

A local `src/data/questions.json` file is also included as a structured fallback/reference, keyed by difficulty level (`Easy`, `Medium`, `Hard`), each containing an array of `Question` objects.
