Quiz Application

A quiz application built with React + TypeScript using Vite. The user selects a difficulty level and then answers a series of single-choice questions within a limited time. After completing the quiz, the result and a star rating based on the number of correct answers are displayed.

Features
Difficulty selection: Easy / Medium / Hard
Randomized question order after selecting a level
Single-choice questions (4 answers)
Time limit per question with a progress bar
Answer highlighting:
correct → green
incorrect → red
Automatic transition to the next question after answering (after a short delay) or when time runs out
Final screen with score and star rating
Game state managed via React Context (QuizContext)
Technologies
React (React DOM)
TypeScript
Vite
ESLint
(Styling: utility classes – the project includes a tailwind.config.js configuration)
Project Structure (overview)
src/context/QuizContext.tsx – global game state (start, level, question number, correct answers, game end, etc.)
src/data/questions.json – question database divided by difficulty levels
src/pages/
StartPage.tsx – start screen
CountingPage.tsx – countdown before starting
QuestionPage.tsx – question screen and quiz logic
src/components/
LevelSelection.tsx – difficulty selection
StartModal.tsx – start modal after selecting a level
FinishModal.tsx – final modal with results
TimeProgressBar.tsx – time bar for answering
Score.tsx, Footer.tsx, Modal.tsx – UI components
Requirements
Node.js (recommended current LTS version)
npm (or another package manager if you adjust the commands)
Installation and Running

Go to the application directory (the project is in the Quiz_application folder):

cd Quiz_application
npm install
npm run dev

The application will run by default at the address shown in the terminal (usually http://localhost:5173).

Production Build
cd Quiz_application
npm run build
npm run preview
Question Data

Questions are located in the file:

src/data/questions.json

Format (example):

{
  "Easy": [
    {
      "question": "Example question?",
      "answers": ["A", "B", "C", "D"],
      "correct": "B"
    }
  ]
}
Scoring / Star System

The application counts the number of correct answers (correctAnswers). Based on this, stars are awarded:

3 stars: ≥ 9 correct answers
2 stars: ≥ 6 correct answers
1 star: ≥ 3 correct answers
0 stars: fewer than 3

(Logic implemented in QuizContext.tsx.)
