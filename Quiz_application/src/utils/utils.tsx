import he from "he";

import starImage from '../assets/star_icon.png';

import type { RawQuestion, Question, Level } from "../types/types";
import type { highestScoreType } from "../context/QuizContext";

export function prepareQuestionsData(questionsData: RawQuestion[]): Question[] {
    return questionsData.map((question) => {
        const allAnswers = [...question.incorrect_answers, question.correct_answer];
        for (let i = allAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
        }

        return {
            question: he.decode(question.question),
            answers: allAnswers.map(answer => he.decode(answer)),
            correct: he.decode(question.correct_answer),
        }
    })
}

export const renderStars = (correctAnswers: number) => {
    let numberOfStars = 0;
    if (correctAnswers >= 9) {
        numberOfStars = 3;
    }
    else if (correctAnswers >= 6) {
        numberOfStars = 2;
    }
    else if (correctAnswers >= 3) {
        numberOfStars = 1;
    }
    else {
        numberOfStars = 0;
    }

    const stars = [];
    for (let i = 0; i < numberOfStars; i++) {
        stars.push(<img key={i} src={starImage} alt="Star image" className='size-20' />);
    }
    return stars;
}

export const checkUnblockedLevels = (highestScore: highestScoreType, selectedLevel: Level) => {

    let buttonText = 'Start Quiz!';
    let disabled = false;

    if (selectedLevel && selectedLevel !== 'Easy') {
        if (selectedLevel === 'Medium') {
            buttonText = highestScore['Easy'] > 6 ? 'Start Quiz!' : 'Blocked';
            disabled = highestScore['Easy'] <= 6;
        }
        if (selectedLevel === 'Hard') {
            buttonText = highestScore['Medium'] > 6 ? 'Start Quiz!' : 'Blocked';
            disabled = highestScore['Medium'] <= 6;
        }
    }
    return { buttonText, disabled };
}