# Quiz Application

A quiz application built with **React + TypeScript** using **Vite**. The user selects a difficulty level and then answers a series of single-choice questions (one answer per question) under a time limit. After the quiz ends, the final score and a star rating (based on the number of correct answers) are displayed.

## Features

- Difficulty selection: **Easy / Medium / Hard**
- Questions are shuffled randomly after selecting a level
- Single-choice questions (choose one answer out of four)
- **Per-question time limit** with a progress bar
- Answer highlighting:
  - correct → green
  - incorrect → red
- Automatically moves to the next question after answering (after a short delay) or when the time runs out
- Finish screen/modal with the score and star rating
- Game state handled via **React Context** (`QuizContext`)

## Tech Stack

- React (React DOM)
- TypeScript
- Vite
- (Styling: utility classes — the project includes `tailwind.config.js`)

## Project Structure (overview)

- `src/context/QuizContext.tsx` – global game state (start, level, question index, correct answers, game finish, etc.)
- `src/data/questions.json` – question database split by difficulty level
- `src/pages/`
  - `StartPage.tsx` – start screen
  - `CountingPage.tsx` – pre-start countdown
  - `QuestionPage.tsx` – quiz screen and main quiz logic
- `src/components/`
  - `LevelSelection.tsx` – difficulty picker
  - `StartModal.tsx` – start modal after selecting a level
  - `FinishModal.tsx` – finish modal with results
  - `TimeProgressBar.tsx` – time progress bar for answering
  - `Score.tsx`, `Footer.tsx`, `Modal.tsx` – UI components

## Requirements

- Node.js (recommended: current LTS)
- npm (or another package manager if you adjust the commands)

## Installation & Running Locally

Go to the app directory (the project is inside the `Quiz_application` folder):

```bash
cd Quiz_application
npm install
npm run dev
```

The app will be available at the URL shown in your terminal (commonly `http://localhost:5173`).

## Production Build

```bash
cd Quiz_application
npm run build
npm run preview
```

## Question Data

Questions are stored in:

- `src/data/questions.json`

Format example:

```json
{
  "Easy": [
    {
      "question": "Example question?",
      "answers": ["A", "B", "C", "D"],
      "correct": "B"
    }
  ]
}
```

## Scoring / Star Rating

The app counts the number of correct answers (`correctAnswers`). Based on that, it renders stars:

- **3 stars**: ≥ 9 correct answers
- **2 stars**: ≥ 6 correct answers
- **1 star**: ≥ 3 correct answers
- **0 stars**: below 3

(Logic is implemented in `QuizContext`
